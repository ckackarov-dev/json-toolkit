export function extractKeys(obj: any, keys: Set<string>) {
  if (Array.isArray(obj)) {
    obj.forEach((item) => extractKeys(item, keys));
    return;
  }

  if (obj && typeof obj === "object") {
    Object.keys(obj).forEach((key) => {
      keys.add(key);
      extractKeys(obj[key], keys);
    });
  }
}
