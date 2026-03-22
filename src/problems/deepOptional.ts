export type DeepOptionalIssue = {
  path: string;
  depth: number;
  optionalRatio: number;
  message: string;
};

function isPlainObject(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function analyzeDepth(
  obj: any,
  path = "",
  depth = 0,
  optionalCount = 0,
  totalCount = 0,
  issues: DeepOptionalIssue[] = [],
) {
  if (!isPlainObject(obj)) return;

  const keys = Object.keys(obj);

  const newTotal = totalCount + keys.length;
  const newOptional = optionalCount + keys.filter((k) => obj[k] == null).length;

  const ratio = newOptional / (newTotal || 1);

  if (depth >= 2 && ratio >= 0.3) {
    issues.push({
      path,
      depth,
      optionalRatio: ratio,
      message: `${path} → deep optional chain (null propagation risk)`,
    });
  }

  keys.forEach((key) => {
    analyzeDepth(
      obj[key],
      path ? `${path}.${key}` : key,
      depth + 1,
      newOptional,
      newTotal,
      issues,
    );
  });

  return issues;
}

export function detectDeepOptionalIssues(data: unknown): DeepOptionalIssue[] {
  return analyzeDepth(data) || [];
}
