type FixResult = {
  fixed: unknown;
  hasChanges: boolean;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeArray(arr: any[]): any[] {
  // collect all keys
  const allKeys = new Set<string>();

  arr.forEach((item) => {
    if (isObject(item)) {
      Object.keys(item).forEach((key) => allKeys.add(key));
    }
  });

  return arr.map((item) => {
    const result: any = {};

    allKeys.forEach((key) => {
      const value = item[key];

      if (value === undefined) {
        result[key] = null;
      } else if (Array.isArray(value)) {
        result[key] = normalizeArray(value);
      } else if (isObject(value)) {
        result[key] = normalizeObject(value);
      } else {
        result[key] = value;
      }
    });

    return result;
  });
}

function normalizeObject(obj: any): any {
  const result: any = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      result[key] = normalizeArray(value);
    } else if (isObject(value)) {
      result[key] = normalizeObject(value);
    } else {
      result[key] = value;
    }
  });

  return result;
}

function mergeObjectKeys(arr: Record<string, any>[]) {
  const allKeys = new Set<string>();

  arr.forEach((obj) => {
    Object.keys(obj).forEach((key) => allKeys.add(key));
  });

  return Array.from(allKeys);
}

function fixArray(arr: unknown[]): FixResult {
  const allObjects = arr.every(isObject);

  if (!allObjects) {
    return { fixed: arr, hasChanges: false };
  }

  const objects = arr as Record<string, any>[];

  const normalized = objects.map((obj) => {
    const fix = buildFixPreview(obj);
    return fix.fixed as Record<string, any>;
  });

  const keys = mergeObjectKeys(normalized);

  let changed = false;

  const fixed = normalized.map((obj, index) => {
    const newObj: Record<string, any> = {};

    keys.forEach((key) => {
      const value = obj[key];

      if (value === undefined) {
        newObj[key] = null;
        changed = true;
      } else if (Array.isArray(value)) {
        const fix = fixArray(value);
        newObj[key] = fix.fixed;
        if (fix.hasChanges) changed = true;
      } else if (isObject(value)) {
        const valuesAtKey = normalized.map((item) => item[key]);

        const allObjects = valuesAtKey.every(isObject);

        if (allObjects) {
          const nestedFix = fixArray(valuesAtKey as Record<string, any>[]);

          const fixedArray = nestedFix.fixed as Record<string, any>[];
          newObj[key] = fixedArray[index];

          if (nestedFix.hasChanges) changed = true;
        } else {
          const fix = buildFixPreview(value);
          newObj[key] = fix.fixed;
          if (fix.hasChanges) changed = true;
        }
      } else {
        newObj[key] = value;
      }
    });

    return newObj;
  });

  return {
    fixed,
    hasChanges: changed,
  };
}
export function buildFixPreview(input: unknown): FixResult {
  if (Array.isArray(input)) {
    return fixArray(input);
  }

  if (isObject(input)) {
    let changed = false;

    const result: Record<string, any> = {};

    Object.entries(input as Record<string, unknown>).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const fix = fixArray(value);
        result[key] = fix.fixed;
        if (fix.hasChanges) changed = true;
      } else if (isObject(value)) {
        const fix = buildFixPreview(value);
        result[key] = fix.fixed;
        if (fix.hasChanges) changed = true;
      } else {
        result[key] = value;
      }
    });

    return {
      fixed: result,
      hasChanges: changed,
    };
  }

  return {
    fixed: input,
    hasChanges: false,
  };
}
