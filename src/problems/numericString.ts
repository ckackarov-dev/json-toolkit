export type NumericStringIssue = {
  path: string;
  value: string;
  confidence: "low" | "medium" | "high";
  message: string;
};

const RISKY_FIELDS = ["id", "code", "zip", "phone"];

function isNumericString(value: unknown): value is string {
  return typeof value === "string" && /^\d+$/.test(value);
}

function isRiskyField(field: string): boolean {
  return RISKY_FIELDS.some((f) => field.toLowerCase().includes(f));
}

function collectValuesByPath(
  obj: any,
  path = "",
  map: Map<string, unknown[]> = new Map(),
) {
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => collectValuesByPath(item, `${path}[${i}]`, map));
    return map;
  }

  if (obj && typeof obj === "object") {
    Object.entries(obj).forEach(([key, value]) => {
      const newPath = path ? `${path}.${key}` : key;

      if (!map.has(newPath)) {
        map.set(newPath, []);
      }

      map.get(newPath)!.push(value);

      collectValuesByPath(value, newPath, map);
    });
  }

  return map;
}

export function detectNumericStringIssues(data: unknown): NumericStringIssue[] {
  const issues: NumericStringIssue[] = [];
  const map = collectValuesByPath(data);

  for (const [path, values] of map.entries()) {
    const hasNumber = values.some((v) => typeof v === "number");
    const numericStrings = values.filter(isNumericString);

    if (!hasNumber || numericStrings.length === 0) continue;

    const fieldName = path.split(".").pop() || "";

    const safeToConvert = !isRiskyField(fieldName);

    const confidence: NumericStringIssue["confidence"] = safeToConvert
      ? "high"
      : "low";

    if (confidence === "low") continue;

    issues.push({
      path,
      value: numericStrings[0],
      confidence,
      message: `${path} → unstable type (string | number)`,
    });
  }

  return issues;
}
