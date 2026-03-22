import { InsightRuleResult } from "./types";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function formatPath(path: string): string {
  return path || "root";
}

function getObjectKeys(obj: Record<string, unknown>): string[] {
  return Object.keys(obj).sort();
}

function isNumericString(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /^-?\d+(\.\d+)?$/.test(trimmed);
}

function isDateLikeString(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;

  const isoLike =
    /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ||
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(trimmed);

  if (!isoLike) return false;

  const time = Date.parse(trimmed);
  return !Number.isNaN(time);
}

function collectArrayObjectShapeInsights(
  value: unknown,
  path = "",
  insights: InsightRuleResult[] = [],
): InsightRuleResult[] {
  if (Array.isArray(value)) {
    const currentPath = formatPath(path);

    if (value.length === 0) {
      insights.push({
        id: `empty-array:${currentPath}`,
        title: "Empty array with unknown future shape",
        severity: "warning",
        confidence: "high",
        summary: `${currentPath} is an empty array, so its future item shape is unknown.`,
        risks: [
          "Type inference may become too loose",
          "Future API responses may introduce unstable structure",
        ],
        actions: [
          "Treat this array cautiously in generated types",
          "Validate future payloads before assuming item shape",
        ],
      });
    }

    const objectItems = value.filter(isPlainObject);

    if (objectItems.length >= 2) {
      const keySets = objectItems.map((item) => getObjectKeys(item).join("|"));
      const uniqueKeySets = new Set(keySets);

      if (uniqueKeySets.size > 1) {
        const unionKeys = new Set<string>();
        const keyFrequency = new Map<string, number>();

        objectItems.forEach((item) => {
          const keys = getObjectKeys(item);
          keys.forEach((key) => {
            unionKeys.add(key);
            keyFrequency.set(key, (keyFrequency.get(key) ?? 0) + 1);
          });
        });

        const total = objectItems.length;
        const unstableFields = Array.from(unionKeys)
          .map((key) => ({
            key,
            count: keyFrequency.get(key) ?? 0,
          }))
          .filter((entry) => entry.count !== total)
          .sort((a, b) => a.count - b.count)
          .slice(0, 3)
          .map(
            (entry) =>
              `"${entry.key}" appears in ${entry.count}/${total} items`,
          );

        insights.push({
          id: `inconsistent-array-shape:${currentPath}`,
          title: "Inconsistent object shape inside array",
          severity: "critical",
          confidence: "high",
          summary: `${currentPath} contains object items with different field sets.`,
          risks: [
            "Unsafe assumptions in UI rendering",
            "TypeScript may require unions or optional fields",
            "Runtime undefined access when fields are missing",
          ],
          actions: [
            "Use optional fields for frontend-safe types",
            "Normalize backend response to a stable object shape",
            ...unstableFields,
          ],
        });
      }
    }

    value.forEach((item, index) => {
      collectArrayObjectShapeInsights(item, `${path}[${index}]`, insights);
    });

    return insights;
  }

  if (isPlainObject(value)) {
    Object.entries(value).forEach(([key, child]) => {
      const nextPath = path ? `${path}.${key}` : key;
      collectArrayObjectShapeInsights(child, nextPath, insights);
    });
  }

  return insights;
}

function collectMixedPrimitiveTypeInsights(
  value: unknown,
  path = "",
  insights: InsightRuleResult[] = [],
): InsightRuleResult[] {
  if (Array.isArray(value)) {
    const currentPath = formatPath(path);

    const primitiveTypes = new Set<string>();

    value.forEach((item) => {
      if (item === null) {
        primitiveTypes.add("null");
        return;
      }

      if (!Array.isArray(item) && !isPlainObject(item)) {
        primitiveTypes.add(typeof item);
      }
    });

    if (primitiveTypes.size > 1) {
      insights.push({
        id: `mixed-primitive-types:${currentPath}`,
        title: "Mixed primitive types in array",
        severity: "critical",
        confidence: "high",
        summary: `${currentPath} mixes primitive item types: ${Array.from(
          primitiveTypes,
        ).join(", ")}.`,
        risks: [
          "Unstable runtime assumptions",
          "Generated types may become noisy unions",
          "Comparison and formatting logic may break",
        ],
        actions: [
          "Normalize the backend response to one primitive type",
          "Add explicit coercion before rendering",
        ],
      });
    }

    value.forEach((item, index) => {
      collectMixedPrimitiveTypeInsights(item, `${path}[${index}]`, insights);
    });

    return insights;
  }

  if (isPlainObject(value)) {
    Object.entries(value).forEach(([key, child]) => {
      const nextPath = path ? `${path}.${key}` : key;
      collectMixedPrimitiveTypeInsights(child, nextPath, insights);
    });
  }

  return insights;
}

function collectNullableInsights(
  value: unknown,
  path = "",
  insights: InsightRuleResult[] = [],
): InsightRuleResult[] {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectNullableInsights(item, `${path}[${index}]`, insights);
    });
    return insights;
  }

  if (isPlainObject(value)) {
    Object.entries(value).forEach(([key, child]) => {
      const currentPath = path ? `${path}.${key}` : key;

      if (child === null) {
        insights.push({
          id: `nullable-field:${currentPath}`,
          title: "Nullable field detected",
          severity: "warning",
          confidence: "high",
          summary: `${formatPath(currentPath)} is null in this payload.`,
          risks: [
            "UI may assume a concrete value exists",
            "Strict types may not reflect nullable behavior",
          ],
          actions: [
            "Represent this field as nullable in the schema",
            "Add null fallback handling in the UI",
          ],
        });
      } else {
        collectNullableInsights(child, currentPath, insights);
      }
    });
  }

  return insights;
}

function collectStringPatternInsights(
  value: unknown,
  path = "",
  insights: InsightRuleResult[] = [],
): InsightRuleResult[] {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectStringPatternInsights(item, `${path}[${index}]`, insights);
    });
    return insights;
  }

  if (isPlainObject(value)) {
    Object.entries(value).forEach(([key, child]) => {
      const currentPath = path ? `${path}.${key}` : key;

      if (typeof child === "string") {
        if (isNumericString(child)) {
          const cleanPath = (currentPath || "root")
            .replace(/\[\d+\]/g, "[]")
            .replace(/^root\./, "");
          const fullPath = cleanPath.endsWith(`.${key}`)
            ? cleanPath
            : `${cleanPath}.${key}`;
          insights.push({
            id: `numeric-string:${currentPath}`,
            title: "Numeric string detected",
            severity: "warning",
            confidence: "medium",
            summary: `${fullPath} looks numeric but is currently a string.`,

            risks: [
              "Sorting and comparisons may behave incorrectly",
              "Math operations may require manual coercion",
            ],
            actions: [
              "Decide whether this field should remain a string or become a number",
              "Normalize or coerce before using it in calculations",
            ],

            meta: {
              field: key,
              path: cleanPath,
            },
          });
        }

        if (isDateLikeString(child)) {
          insights.push({
            id: `date-like-string:${currentPath}`,
            title: "Date-like string detected",
            severity: "info",
            confidence: "high",
            summary: `${formatPath(currentPath)} looks like a date/time string.`,
            risks: [
              "Consumers may treat it as a generic string instead of time data",
            ],
            actions: [
              "Document this field as date-like in your schema or typings",
              "Normalize date parsing in one place before rendering",
            ],
          });
        }
      } else {
        collectStringPatternInsights(child, currentPath, insights);
      }
    });
  }

  return insights;
}

function collectEnumCandidateInsights(
  value: unknown,
  path = "",
  insights: InsightRuleResult[] = [],
): InsightRuleResult[] {
  if (Array.isArray(value)) {
    const currentPath = formatPath(path);

    const stringItems = value.filter(
      (item): item is string => typeof item === "string",
    );
    const unique = Array.from(new Set(stringItems));

    if (
      value.length >= 3 &&
      stringItems.length === value.length &&
      unique.length >= 2 &&
      unique.length <= 6
    ) {
      insights.push({
        id: `enum-candidate:${currentPath}`,
        title: "Enum-like string array detected",
        severity: "info",
        confidence: "medium",
        summary: `${currentPath} looks like a constrained string set: ${unique
          .slice(0, 5)
          .map((item) => `"${item}"`)
          .join(", ")}.`,
        risks: ["Unknown future values may not be handled"],
        actions: [
          "Consider generating a string union for these values",
          "Add a fallback for unexpected enum values",
        ],
      });
    }

    value.forEach((item, index) => {
      collectEnumCandidateInsights(item, `${path}[${index}]`, insights);
    });

    return insights;
  }

  if (isPlainObject(value)) {
    Object.entries(value).forEach(([key, child]) => {
      const nextPath = path ? `${path}.${key}` : key;
      collectEnumCandidateInsights(child, nextPath, insights);
    });
  }

  return insights;
}
function collectMixedFieldTypeInsights(
  value: unknown,
  path = "",
  insights: InsightRuleResult[] = [],
): InsightRuleResult[] {
  if (Array.isArray(value)) {
    const objectItems = value.filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null && !Array.isArray(item),
    );

    if (objectItems.length >= 2) {
      const fieldTypesMap = new Map<string, Set<string>>();

      objectItems.forEach((obj) => {
        Object.entries(obj).forEach(([key, val]) => {
          let type: string;

          if (val === null) type = "null";
          else if (Array.isArray(val)) type = "array";
          else type = typeof val;

          if (!fieldTypesMap.has(key)) {
            fieldTypesMap.set(key, new Set());
          }

          fieldTypesMap.get(key)!.add(type);
        });
      });

      fieldTypesMap.forEach((types, field) => {
        if (types.size > 1) {
          const basePath = (path || "root")
            .replace(/\[\d+\]/g, "[]")
            .replace(/^root\./, "");

          // 👉 ensure array-style path
          const normalizedPath = basePath.includes("[]")
            ? basePath
            : `${basePath}[]`;

          const fullPath = `${normalizedPath}.${field}`;

          insights.push({
            id: `mixed-field-type:${fullPath}`,
            title: "Field has unstable type",
            severity: "critical",
            confidence: "high",

            summary: `${fullPath} → unstable type (${Array.from(types).join(" | ")})`,

            risks: [
              "TypeScript unions may become unsafe",
              "Runtime logic may fail depending on type",
            ],

            actions: [
              `Normalize "${field}" to a single type`,
              "Add type guards before usage",
            ],

            meta: {
              field,
              path: normalizedPath,
            },
          });
        }
      });
    }

    value.forEach((item, index) => {
      collectMixedFieldTypeInsights(item, `${path}[${index}]`, insights);
    });

    return insights;
  }

  if (typeof value === "object" && value !== null) {
    Object.entries(value).forEach(([key, child]) => {
      const nextPath = path ? `${path}.${key}` : key;
      collectMixedFieldTypeInsights(child, nextPath, insights);
    });
  }

  return insights;
}

function mapProblemsToInsights(problems: string[]): InsightRuleResult[] {
  const insights: InsightRuleResult[] = [];

  const hasInconsistent = problems.some((problem) =>
    problem.toLowerCase().includes("inconsistent"),
  );

  const appearsInProblems = problems.filter((problem) =>
    problem.toLowerCase().includes("appears in"),
  );

  if (hasInconsistent) {
    insights.push({
      id: "problem-map:inconsistent",
      title: "Backend shape inconsistency detected",
      severity: "critical",
      confidence: "high",
      summary:
        "The payload already shows structural inconsistencies across similar items.",
      risks: [
        "Frontend components may rely on fields that are not always present",
        "Type generation may require unions or optional fields",
      ],
      actions: [
        "Prefer frontend-safe optional fields",
        "Review backend normalization if a stable contract is expected",
      ],
    });
  }

  if (appearsInProblems.length > 0) {
    insights.push({
      id: "problem-map:missing-frequency",
      title: "Fields are not consistently present",
      severity: "warning",
      confidence: "high",
      summary: "Some fields only appear in a subset of items.",
      risks: [
        "Unsafe property access in rendering code",
        "Conditional UI paths may be required",
      ],
      actions: [
        "Guard field access in the UI",
        "Treat these fields as optional in types and schema",
      ],
    });
  }

  return insights;
}

function dedupeInsights(insights: InsightRuleResult[]): InsightRuleResult[] {
  const seen = new Set<string>();
  const result: InsightRuleResult[] = [];

  for (const insight of insights) {
    if (seen.has(insight.id)) continue;
    seen.add(insight.id);
    result.push(insight);
  }

  return result;
}

function rankSeverity(severity: InsightRuleResult["severity"]): number {
  switch (severity) {
    case "critical":
      return 3;
    case "warning":
      return 2;
    case "info":
    default:
      return 1;
  }
}

export function runInsightEngine(
  parsed: unknown,
  problems: string[] = [],
): InsightRuleResult[] {
  const insights: InsightRuleResult[] = [
    ...mapProblemsToInsights(problems),
    ...collectArrayObjectShapeInsights(parsed),
    ...collectMixedPrimitiveTypeInsights(parsed),
    ...collectMixedFieldTypeInsights(parsed),
    ...collectNullableInsights(parsed),
    ...collectStringPatternInsights(parsed),
    ...collectEnumCandidateInsights(parsed),
  ];

  return dedupeInsights(insights).sort(
    (a, b) => rankSeverity(b.severity) - rankSeverity(a.severity),
  );
}
