export function buildFixDiff(before: any, after: any): string {
  const beforeStr = JSON.stringify(before, null, 2);
  const afterStr = JSON.stringify(after, null, 2);

  const beforeLines = new Set(beforeStr.split("\n"));
  const afterLines = afterStr.split("\n");

  const diff: string[] = [];

  for (const line of afterLines) {
    if (!beforeLines.has(line)) {
      diff.push(`+ ${line}`);
    } else {
      diff.push(`  ${line}`);
    }
  }

  return diff.join("\n");
}
