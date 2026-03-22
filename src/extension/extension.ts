import * as vscode from "vscode";
import JSON5 from "json5";
import { jsonToTypesAndZod } from "../core/jsonToTypesAndZod";
import { JsonToZodCodeActionProvider } from "../core/providers/codeActionProvider";
import { extractJsonFromCode } from "../core/utils/extractJson";
import { JsonHoverProvider } from "../core/providers/hoverProvider";
import { JsonCodeLensProvider } from "../core/providers/codeLensProvider";
import { updateInlineInsights } from "../decorations/inlineInsights";
import { buildFixPreview } from "../core/fixes/buildFixPreview";
import { formatInsightMarkdown } from "../core/insights/formatInsightMarkdown";
import { runInsightEngine } from "../core/insights/runInsightEngine";
import { detectAllProblems } from "../problems";
import { detectShapeProblems } from "../core/utils/jsonShapeProblems";
import { explainJson } from "../core/utils/jsonExplain";
import { applyJsonHighlights } from "../decorations/applyJsonHighlights";
import {
  criticalDecoration,
  warningDecoration,
} from "../decorations/jsonProblems";

function toSafeRange(
  doc: vscode.TextDocument,
  maybeRange: unknown,
): vscode.Range | null {
  if (!maybeRange || typeof maybeRange !== "object") {
    return null;
  }

  const candidate = maybeRange as {
    start?: { line?: number; character?: number };
    end?: { line?: number; character?: number };
  };

  const isValid =
    typeof candidate.start?.line === "number" &&
    typeof candidate.start?.character === "number" &&
    typeof candidate.end?.line === "number" &&
    typeof candidate.end?.character === "number";

  if (!isValid) return null;

  try {
    const startLine = candidate.start?.line;
    const startChar = candidate.start?.character;
    const endLine = candidate.end?.line;
    const endChar = candidate.end?.character;

    if (
      typeof startLine !== "number" ||
      typeof startChar !== "number" ||
      typeof endLine !== "number" ||
      typeof endChar !== "number"
    ) {
      return null;
    }

    // ✅ τώρα είναι καθαρά number (TS happy)
    const range = new vscode.Range(
      new vscode.Position(startLine, startChar),
      new vscode.Position(endLine, endChar),
    );

    // 🔒 validation
    doc.getText(range);

    return range;
  } catch {
    return null;
  }
}
export function activate(context: vscode.ExtensionContext) {
  const generateCommand = vscode.commands.registerCommand(
    "jsonLens.generate",
    async (range?: vscode.Range) => {
      console.log("🔥 COMMAND TRIGGERED");

      try {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
          console.log("❌ No editor");
          return;
        }

        const doc = editor.document;

        let text: string;

        // 🔒 sanitize incoming range (IMPORTANT FIX)
        const safeRange = toSafeRange(doc, range);

        if (safeRange) {
          text = doc.getText(safeRange);
        } else if (!editor.selection.isEmpty) {
          text = doc.getText(editor.selection);
        } else {
          text = doc.getText();
        }

        console.log("📄 TEXT LENGTH:", text.length);

        const extracted = extractJsonFromCode(text);

        console.log("🧩 EXTRACTED:", extracted?.slice(0, 100));

        if (!extracted) {
          console.log("❌ No JSON extracted");
          vscode.window.showErrorMessage("No JSON found");
          return;
        }

        const parsed = JSON5.parse(extracted);

        console.log("✅ PARSED");

        const output = jsonToTypesAndZod(parsed, "RootObject", "full", true);

        console.log("📦 OUTPUT:", output?.slice(0, 200));

        if (!output) {
          console.log("❌ No output generated");
          vscode.window.showErrorMessage("Failed to generate types");
          return;
        }

        const docOut = await vscode.workspace.openTextDocument({
          content: output,
          language: "typescript",
        });

        await vscode.window.showTextDocument(docOut, {
          preview: true,
          viewColumn: vscode.ViewColumn.Beside,
        });

        console.log("🚀 DONE");
      } catch (err: any) {
        console.error("💥 ERROR:", err);
        vscode.window.showErrorMessage(
          "Generation failed: " + (err?.message || err),
        );
      }
    },
  );
  applyInitialHighlights();

  function applyInitialHighlights() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const text = editor.document.getText();

    let extracted: string | null = null;

    if (editor.document.languageId === "json") {
      extracted = text;
    } else {
      extracted = extractJsonFromCode(text);
    }

    if (!extracted) return;

    try {
      const parsed = JSON5.parse(extracted);
      const problems = detectShapeProblems(parsed);

      applyJsonHighlights(editor, text, problems);
    } catch {}
  }
  const applyFixCommand = vscode.commands.registerCommand(
    "jsonLens.applyFix",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const doc = editor.document;
      const fullText = doc.getText();

      let targetText: string;
      let range: vscode.Range | undefined;

      if (!editor.selection.isEmpty) {
        targetText = doc.getText(editor.selection);
        range = editor.selection;
      } else {
        const extracted = extractJsonFromCode(fullText);

        if (!extracted) {
          vscode.window.showErrorMessage("No JSON detected");
          return;
        }

        targetText = extracted;

        const startIndex = fullText.indexOf(extracted);

        if (startIndex === -1) {
          vscode.window.showErrorMessage("Failed to locate JSON in document");
          return;
        }

        const start = doc.positionAt(startIndex);
        const end = doc.positionAt(startIndex + extracted.length);

        range = new vscode.Range(start, end);
      }

      try {
        const initialVersion = doc.version;

        const parsed = JSON5.parse(targetText);

        const { fixed, hasChanges } = buildFixPreview(parsed);

        if (!hasChanges) {
          vscode.window.showInformationMessage("No fix needed");
          return;
        }

        const fixedStr = JSON.stringify(fixed, null, 2);

        if (doc.version !== initialVersion) {
          vscode.window.showWarningMessage(
            "Document changed. Please retry the fix.",
          );
          return;
        }

        if (!range) {
          vscode.window.showErrorMessage("No valid range to replace");
          return;
        }

        const edit = new vscode.WorkspaceEdit();
        edit.replace(doc.uri, range, fixedStr);

        const success = await vscode.workspace.applyEdit(edit);

        if (!success) {
          vscode.window.showErrorMessage("Failed to apply fix");
          return;
        }

        vscode.window.showInformationMessage("✅ JSON fixed safely");
      } catch (err: any) {
        vscode.window.showErrorMessage(
          "Failed to apply fix: " + (err?.message || err),
        );
      }
    },
  );

  const openFullAnalysisCommand = vscode.commands.registerCommand(
    "jsonLens.openFullAnalysis",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const text = editor.document.getText();
      const extracted = extractJsonFromCode(text);
      if (!extracted) return;

      try {
        const parsed = JSON5.parse(extracted);

        const typesOutput = jsonToTypesAndZod(parsed);
        const explanation = explainJson(parsed);
        const problems = detectShapeProblems(parsed);
        const advancedProblems = detectAllProblems(parsed);

        const insights = runInsightEngine(parsed, problems);
        const insightMarkdown = formatInsightMarkdown(
          insights,
          problems,
          advancedProblems,
        );

        let fullContent = `# ✨ JSON Toolkit Full Analysis\n\n`;

        fullContent += insightMarkdown + "\n\n";

        if (problems.length > 0) {
          fullContent += `## ⚠ Problems\n\n`;
          fullContent += problems.join("\n") + "\n\n";
        }

        if (explanation) {
          fullContent += `## 💡 Explanation\n\n`;
          fullContent += "```ts\n" + explanation + "\n```\n\n";
        }

        if (typesOutput) {
          fullContent += `## 📦 Types\n\n`;
          fullContent += "```ts\n" + typesOutput + "\n```\n\n";
        }

        const doc = await vscode.workspace.openTextDocument({
          content: fullContent,
          language: "markdown",
        });

        await vscode.window.showTextDocument(doc, {
          preview: true,
          viewColumn: vscode.ViewColumn.Beside,
        });
      } catch {
        vscode.window.showErrorMessage("Failed to open full analysis");
      }
    },
  );

  const fixAndGenerateCommand = vscode.commands.registerCommand(
    "jsonLens.fixAndGenerate",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      let text: string;
      let range: vscode.Range | undefined;

      // ✅ 1. Prefer user selection (most deterministic)
      if (!editor.selection.isEmpty) {
        text = editor.document.getText(editor.selection);
        range = editor.selection;
      } else {
        // ⚠ fallback → extract JSON from full document
        const fullText = editor.document.getText();
        const extracted = extractJsonFromCode(fullText);

        if (!extracted) {
          vscode.window.showErrorMessage("No JSON detected");
          return;
        }

        text = extracted;

        // 🔥 find exact position in document
        const startIndex = fullText.indexOf(extracted);
        if (startIndex !== -1) {
          const start = editor.document.positionAt(startIndex);
          const end = editor.document.positionAt(startIndex + extracted.length);
          range = new vscode.Range(start, end);
        }
      }

      try {
        const parsed = JSON5.parse(text);

        // 🔥 STEP 1 — FIX
        const { fixed } = buildFixPreview(parsed);

        // 🔥 STEP 2 — REPLACE ORIGINAL JSON (SAFE)
        if (range) {
          const edit = new vscode.WorkspaceEdit();
          edit.replace(
            editor.document.uri,
            range,
            JSON.stringify(fixed, null, 2),
          );
          await vscode.workspace.applyEdit(edit);
        }

        // 🔥 STEP 3 — GENERATE TYPES
        const output = jsonToTypesAndZod(fixed);

        if (!output) {
          vscode.window.showErrorMessage("Failed to generate types");
          return;
        }

        console.log("OUTPUT TYPE:", typeof output);
        console.log("OUTPUT LENGTH:", output?.length);
        console.log("OUTPUT VALUE:", output);

        if (
          !output ||
          typeof output !== "string" ||
          output.trim().length === 0
        ) {
          console.log("❌ INVALID OUTPUT:", output);
          vscode.window.showErrorMessage("Invalid generated output");
          return;
        }

        // 🔥 STEP 4 — OPEN RESULT
        const doc = await vscode.workspace.openTextDocument({
          content: output,
          language: "typescript",
        });

        await vscode.window.showTextDocument(doc, {
          preview: true,
          viewColumn: vscode.ViewColumn.Beside,
        });

        vscode.window.showInformationMessage("⚡ Fixed + Generated Types");
      } catch (err) {
        vscode.window.showErrorMessage("Fix + Generate failed");
      }
    },
  );

  const previewGenerateCommand = vscode.commands.registerCommand(
    "jsonLens.previewGenerate",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const text = editor.document.getText();

      const extracted = extractJsonFromCode(text);
      if (!extracted) return;

      try {
        const parsed = JSON5.parse(extracted);

        const output = jsonToTypesAndZod(parsed);

        if (!output) {
          vscode.window.showErrorMessage("Failed to generate types");
          return;
        }

        // 👇 OPEN PREVIEW SIDE-BY-SIDE
        const doc = await vscode.workspace.openTextDocument({
          content: output,
          language: "typescript",
        });

        await vscode.window.showTextDocument(doc, {
          preview: true,
          viewColumn: vscode.ViewColumn.Beside,
        });

        vscode.window.showInformationMessage("👁 Preview Generated Types");
      } catch {
        vscode.window.showErrorMessage("Preview failed");
      }
    },
  );

  const codeActionProvider = vscode.languages.registerCodeActionsProvider(
    ["json", "javascript", "typescript"],
    new JsonToZodCodeActionProvider(),
    {
      providedCodeActionKinds: [vscode.CodeActionKind.QuickFix],
    },
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      if (event.document.uri.toString() !== editor.document.uri.toString()) {
        return;
      }

      const text = editor.document.getText();

      let extracted: string | null = null;

      if (editor.document.languageId === "json") {
        extracted = text;
      } else {
        extracted = extractJsonFromCode(text);
      }

      if (!extracted) {
        editor.setDecorations(criticalDecoration, []);
        editor.setDecorations(warningDecoration, []);
        return;
      }

      try {
        const parsed = JSON5.parse(extracted);
        const problems = detectShapeProblems(parsed);

        applyJsonHighlights(editor, text, problems);
      } catch {
        editor.setDecorations(criticalDecoration, []);
        editor.setDecorations(warningDecoration, []);
      }
    }),
  );

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (!editor) return;

      const text = editor.document.getText();

      let extracted: string | null = null;

      if (editor.document.languageId === "json") {
        extracted = text;
      } else {
        extracted = extractJsonFromCode(text);
      }

      if (!extracted) return;

      try {
        const parsed = JSON5.parse(extracted);
        const problems = detectShapeProblems(parsed);

        applyJsonHighlights(editor, text, problems);
      } catch {}
    }),
  );

  vscode.commands.registerCommand("jsonLens.copyTypes", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const text = editor.document.getText();

    const extracted = extractJsonFromCode(text);
    if (!extracted) return;

    try {
      const parsed = JSON5.parse(extracted);
      const output = jsonToTypesAndZod(parsed);

      if (!output) return;

      // 👉 μόνο TYPES (όχι zod)
      const typesOnly = output.split("const")[0].trim();

      await vscode.env.clipboard.writeText(typesOnly);

      vscode.window.showInformationMessage("✅ Types copied");
    } catch {
      vscode.window.showErrorMessage("❌ Failed to copy types");
    }
  });

  vscode.commands.registerCommand("jsonLens.copyZod", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const text = editor.document.getText();

    const extracted = extractJsonFromCode(text);
    if (!extracted) return;

    try {
      const parsed = JSON5.parse(extracted);
      const output = jsonToTypesAndZod(parsed);

      if (!output) return;

      // 👉 μόνο ZOD μέρος
      const zodPart = output.split("const").slice(1).join("const").trim();

      await vscode.env.clipboard.writeText(zodPart);

      vscode.window.showInformationMessage("✅ Zod copied");
    } catch {
      vscode.window.showErrorMessage("❌ Failed to copy Zod");
    }
  });

  context.subscriptions.push(previewGenerateCommand);

  context.subscriptions.push(fixAndGenerateCommand);

  context.subscriptions.push(openFullAnalysisCommand);

  context.subscriptions.push(applyFixCommand);

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        updateInlineInsights(editor);
      }
    }),

    vscode.workspace.onDidChangeTextDocument((event) => {
      const editor = vscode.window.activeTextEditor;

      if (editor && event.document === editor.document) {
        updateInlineInsights(editor);
      }
    }),
  );

  context.subscriptions.push(generateCommand);
  context.subscriptions.push(codeActionProvider);

  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider(
      ["javascript", "typescript", "json"],
      new JsonCodeLensProvider(),
    ),
  );

  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      ["json", "jsonc", "javascript", "typescript"],
      new JsonHoverProvider(),
    ),
  );
}
