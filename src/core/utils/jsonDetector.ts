export function looksLikeJson(text: string): boolean {
  if (!text) return false;

  const trimmed = text.trim();

  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
    return false;
  }

  if (!trimmed.includes(":")) {
    return false;
  }

  return true;
}
