import * as vscode from "vscode";
import { extractJsonFromCode } from "../utils/extractJson";
import { looksLikeJson } from "../utils/jsonDetector";

export class JsonCodeLensProvider implements vscode.CodeLensProvider {
  provideCodeLenses(document: vscode.TextDocument): vscode.CodeLens[] {
    const text = document.getText();

    const extracted = extractJsonFromCode(text);

    if (!extracted || !looksLikeJson(extracted)) {
      return [];
    }

    // 🔥 find where the object starts inside the document
    const startIndex = text.indexOf(extracted);

    if (startIndex === -1) {
      return [];
    }

    // convert index → position
    const position = document.positionAt(startIndex);

    // create a zero-length range at that position
    const range = new vscode.Range(position, position);

    return [
      new vscode.CodeLens(range, {
        title: "$(zap) Generate Types",
        command: "jsonLensit.generate",
      }),
    ];
  }
}
