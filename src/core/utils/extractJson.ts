export function extractJsonFromCode(text: string): string | null {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : null;
}
