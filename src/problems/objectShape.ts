export type ShapeIssue = {
  path: string;
  type: "warning" | "critical";
  message: string;
};

function isPlainObject(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function analyzeArrayShape(arr: any[], path: string): ShapeIssue | null {
  const objects = arr.filter(isPlainObject);

  if (objects.length < 2) return null;

  const keySets = objects.map((obj) => new Set(Object.keys(obj)));

  const allKeys = new Set<string>();
  keySets.forEach((set) => set.forEach((k) => allKeys.add(k)));

  const keyFrequency = new Map<string, number>();

  keySets.forEach((set) => {
    set.forEach((k) => {
      keyFrequency.set(k, (keyFrequency.get(k) || 0) + 1);
    });
  });

  const total = objects.length;

  const sharedKeys = [...allKeys].filter((k) => keyFrequency.get(k)! === total);

  const hasNoSharedKeys = sharedKeys.length === 0;

  if (hasNoSharedKeys) {
    return {
      path,
      type: "critical",
      message: `${path} → inconsistent object shape (no shared keys)`,
    };
  }

  const partialKeys = [...allKeys].filter((k) => keyFrequency.get(k)! < total);

  const hasLowCoverage = partialKeys.some(
    (k) => keyFrequency.get(k)! / total < 0.7,
  );

  if (hasLowCoverage) {
    return {
      path,
      type: "warning",
      message: `${path} → partially inconsistent shape`,
    };
  }

  return null;
}

function walk(data: any, path = "", issues: ShapeIssue[] = []) {
  if (Array.isArray(data)) {
    const issue = analyzeArrayShape(data, path);

    if (issue) issues.push(issue);

    data.forEach((item, i) => walk(item, `${path}[${i}]`, issues));
  } else if (isPlainObject(data)) {
    Object.entries(data).forEach(([key, value]) => {
      const newPath = path ? `${path}.${key}` : key;
      walk(value, newPath, issues);
    });
  }

  return issues;
}

export function detectObjectShapeIssues(data: unknown): ShapeIssue[] {
  return walk(data);
}
