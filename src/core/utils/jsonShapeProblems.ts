type Problem = {
  path: string;
  message: string;
  severity: "warning" | "critical";
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function isNumericString(value: unknown): boolean {
  return typeof value === "string" && /^[0-9]+$/.test(value);
}

export function detectShapeProblems(data: unknown): string[] {
  const problems: Problem[] = [];

  function walk(value: unknown, path: string) {
    // 🟡 ARRAY
    if (Array.isArray(value)) {
      if (value.length === 0) {
        problems.push({
          path,
          message: "empty array, item type unknown",
          severity: "warning",
        });
        return;
      }

      const types = new Set(value.map(getType));

      // ✅ mixed types (improved)
      if (types.size > 1) {
        problems.push({
          path,
          message: `mixed types (${Array.from(types).join(" | ")})`,
          severity: value.some(isObject) ? "critical" : "warning",
        });
      }

      // 🟡 array of objects
      if (value.every(isObject)) {
        // ✅ inconsistent shapes (CRITICAL)
        const shapes = new Set(
          value.map((obj) => Object.keys(obj).sort().join("|")),
        );

        if (shapes.size > 1) {
          problems.push({
            path,
            message: "inconsistent object shape",
            severity: "critical",
          });
        }

        const keysMap = new Map<string, number>();

        value.forEach((item) => {
          Object.keys(item).forEach((key) => {
            keysMap.set(key, (keysMap.get(key) || 0) + 1);
          });
        });

        const total = value.length;

        keysMap.forEach((count, key) => {
          if (count !== total) {
            problems.push({
              path,
              message: `${key} appears in ${count}/${total} items`,
              severity: "warning",
            });
          }
        });

        // ✅ FIX traversal (ALL items)
        value.forEach((item, i) => walk(item, `${path}[${i}]`));
      }

      return;
    }

    // 🟡 OBJECT
    if (isObject(value)) {
      Object.entries(value).forEach(([key, val]) => {
        const currentPath = path ? `${path}.${key}` : key;

        // nullable detection
        if (val === null) {
          problems.push({
            path: currentPath,
            message: "null value detected",
            severity: "warning",
          });
        }

        // numeric string detection
        if (isNumericString(val)) {
          problems.push({
            path: currentPath,
            message: "numeric string detected",
            severity: "warning",
          });
        }

        walk(val, currentPath);
      });

      return;
    }
  }

  walk(data, "root");

  // 🎨 format
  return problems.map((p) => {
    const icon = p.severity === "critical" ? "❌" : "⚠";
    return `${icon} ${p.path}: ${p.message}`;
  });
}
