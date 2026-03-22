import * as vscode from "vscode";

export function findKeyRanges(
  text: string,
  key: string,
  document: vscode.TextDocument,
): vscode.Range[] {
  const ranges: vscode.Range[] = [];

  const regex = new RegExp(`"${key}"\\s*:`, "g");

  let match;
  while ((match = regex.exec(text)) !== null) {
    const start = document.positionAt(match.index);
    const end = document.positionAt(match.index + key.length + 2);

    ranges.push(new vscode.Range(start, end));
  }

  return ranges;
}
