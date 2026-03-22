export function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// ================= TYPES =================

export function mergeObjectArrayTypes(
  arr: Record<string, unknown>[],
  inferType: (v: unknown) => string,
): string {
  const fieldMap = new Map<string, unknown[]>();

  arr.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (!fieldMap.has(key)) {
        fieldMap.set(key, []);
      }
      fieldMap.get(key)!.push(value);
    });
  });

  const fields = Array.from(fieldMap.entries()).map(([key, values]) => {
    const types = Array.from(new Set(values.map((v) => inferType(v))));
    let type = types.length === 1 ? types[0] : types.join(" | ");

    const isOptional = values.length < arr.length;

    return `  ${key}${isOptional ? "?" : ""}: ${type}`;
  });

  return `{\n${fields.join(";\n")}\n}`;
}

// ================= ZOD =================

export function mergeObjectArrayZod(
  arr: Record<string, unknown>[],
  buildZodFromValue: (v: unknown) => string,
): string {
  const fieldMap = new Map<string, unknown[]>();

  arr.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (!fieldMap.has(key)) {
        fieldMap.set(key, []);
      }
      fieldMap.get(key)!.push(value);
    });
  });

  const fields = Array.from(fieldMap.entries()).map(([key, values]) => {
    const types = Array.from(new Set(values.map((v) => buildZodFromValue(v))));

    let type = types.length === 1 ? types[0] : `z.union([${types.join(", ")}])`;

    const isOptional = values.length < arr.length;

    if (isOptional) {
      type += ".optional()";
    }

    return `  ${key}: ${type}`;
  });

  return `z.object({\n${fields.join(",\n")}\n})`;
}
