import * as vscode from "vscode";
import { criticalDecoration, warningDecoration } from "./jsonProblems";
import { findKeyRanges } from "./findJsonKeyRanges";

export function applyJsonHighlights(
  editor: vscode.TextEditor,
  text: string,
  problems: string[],
) {
  const criticalRanges: vscode.Range[] = [];
  const warningRanges: vscode.Range[] = [];

  problems.slice(0, 5).forEach((p) => {
    const isCritical = p.includes("❌");

    const seen = new Set<string>();
    const keys: string[] = [];

    // 👉 split before ":" to isolate path
    const [pathPart] = p.split(":");

    // root.users
    const rootMatch = pathPart.match(/root\.([a-zA-Z0-9_]+)/);
    if (rootMatch) {
      keys.push(rootMatch[1]);
    }

    // 👉 extract fields like "name appears", "age appears"
    const appearsMatches = [...p.matchAll(/([a-zA-Z0-9_]+) appears/g)];
    appearsMatches.forEach((m) => keys.push(m[1]));
    console.log("PROBLEM:", p);
    console.log("KEYS:", keys);
    keys.forEach((key) => {
      if (seen.has(key)) return;
      seen.add(key);

      const ranges = findKeyRanges(text, key, editor.document);

      if (isCritical) {
        criticalRanges.push(...ranges);
      } else {
        warningRanges.push(...ranges);
      }
    });
  });

  editor.setDecorations(criticalDecoration, criticalRanges);
  editor.setDecorations(warningDecoration, warningRanges);
}
