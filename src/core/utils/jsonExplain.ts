function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function analyzeArray(arr: unknown[]) {
  if (arr.length === 0) return "empty array";

  const first = arr[0];

  if (isObject(first)) {
    return "array of objects";
  }

  return `array of ${getType(first)}s`;
}

function describeObject(obj: Record<string, unknown>, indent = 0): string[] {
  const pad = "  ".repeat(indent);

  return Object.entries(obj).flatMap(([key, value]) => {
    // 🟢 ARRAY
    if (Array.isArray(value)) {
      const description = `${pad}- ${key}: ${analyzeArray(value)}`;

      // dive deeper if object array
      if (value.length > 0 && isObject(value[0])) {
        return [
          description,
          ...describeObject(value[0] as Record<string, unknown>, indent + 1),
        ];
      }

      return [description];
    }

    // 🟢 OBJECT
    if (isObject(value)) {
      return [`${pad}- ${key}: object`, ...describeObject(value, indent + 1)];
    }

    // 🟢 PRIMITIVE
    return [`${pad}- ${key}: ${getType(value)}`];
  });
}

export function explainJson(data: unknown): string {
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return "- Root: empty array";
    }

    if (isObject(data[0])) {
      return [
        "- Root: array of objects",
        ...describeObject(data[0] as Record<string, unknown>, 1),
      ].join("\n");
    }

    return `- Root: array of ${getType(data[0])}s`;
  }

  if (isObject(data)) {
    return describeObject(data).join("\n");
  }

  return `- Root: ${getType(data)}`;
}
