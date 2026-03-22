import * as vscode from "vscode";

export class JsonToZodCodeActionProvider implements vscode.CodeActionProvider {
  provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range | vscode.Selection,
  ): vscode.CodeAction[] | undefined {
    const selectedText = document.getText(range);

    if (!selectedText || selectedText.trim().length === 0) {
      return;
    }

    try {
      JSON.parse(selectedText);
    } catch {
      return;
    }

    // 🔹 Action 1 — Generate Types
    const generateAction = new vscode.CodeAction(
      "Generate TypeScript + Zod",
      vscode.CodeActionKind.QuickFix,
    );

    generateAction.command = {
      command: "jsonLensit.generate",
      title: "Generate TypeScript + Zod",
    };

    // 🔥 NEW — Action 2 — Apply Fix
    const fixAction = new vscode.CodeAction(
      "✨ Apply safe JSON fix",
      vscode.CodeActionKind.QuickFix,
    );

    fixAction.command = {
      command: "jsonLensit.applyFix",
      title: "Apply safe JSON fix",
    };

    const fixAndGenerateAction = new vscode.CodeAction(
      "⚡ Fix + Generate Types",
      vscode.CodeActionKind.QuickFix,
    );

    fixAndGenerateAction.command = {
      command: "jsonLensit.fixAndGenerate",
      title: "Fix + Generate Types",
    };

    return [generateAction, fixAction, fixAndGenerateAction];
  }
}
