import * as vscode from "vscode";
import JSON5 from "json5";
import { extractJsonFromCode } from "../utils/extractJson";
import { jsonToTypesAndZod } from "../jsonToTypesAndZod";
import { looksLikeJson } from "../utils/jsonDetector";
import { explainJson } from "../utils/jsonExplain";
import { detectShapeProblems } from "../utils/jsonShapeProblems";
import { buildFixPreview } from "../fixes/buildFixPreview";
import { buildHealthSummary } from "../insights/buildHealthSummary";
import { parse } from "path";

let lastText = "";
let lastResult: vscode.Hover | null = null;

export class JsonHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    // position: vscode.Position,
  ): vscode.Hover | null {
    const text = document.getText();

    if (text === lastText && lastResult) {
      return lastResult;
    }

    lastText = text;

    let extracted: string | null = null;

    if (document.languageId === "json") {
      extracted = text;
    } else {
      extracted = extractJsonFromCode(text);
    }

    if (!extracted || !looksLikeJson(extracted)) {
      return null;
    }

    try {
      const parsed = JSON5.parse(extracted);

      const { hasChanges } = buildFixPreview(parsed);

      const typesOutput = jsonToTypesAndZod(parsed);
      const explanation = explainJson(parsed);
      const problems = detectShapeProblems(parsed);
      const health = buildHealthSummary(problems || []);

      const preview = typesOutput ? typesOutput.split("const")[0].trim() : null;

      const md = new vscode.MarkdownString(undefined, true);
      md.isTrusted = true;
      md.supportHtml = true;

      // 🧬 HEADER
      md.appendMarkdown(`### 🧬 API Insight\n\n`);

      md.appendMarkdown(`**Health:** ${health?.status}\n\n`);
      md.appendMarkdown(`_${health?.summary}_\n\n`);
      md.appendMarkdown(`---\n\n`);

      // md.appendMarkdown(
      //   `🚀 **[Generate full Types + Zod](command:jsonLens.generate)**\n`,
      // );
      md.appendMarkdown(`---\n\n`);

      const hasNulls = JSON.stringify(parsed).includes(": null");

      if (!problems.some((p) => p.includes("inconsistent")) && hasNulls) {
        md.appendMarkdown(`⚠ Structure normalized (null values present)\n\n`);
      }

      // 🔴 SUMMARY (stronger visual)
      const criticalCount = (problems || []).filter((p) =>
        p.includes("❌"),
      ).length;

      const warningCount = (problems || []).filter((p) =>
        p.includes("⚠"),
      ).length;

      if (problems.length > 0) {
        md.appendMarkdown(`---\n\n`);
        md.appendMarkdown(`### 💥 **Impact**\n\n`);

        if (problems.some((p) => p.includes("inconsistent"))) {
          md.appendMarkdown(`- ❌ UI may break due to missing fields\n`);
        }

        if (problems.some((p) => p.includes("numeric string"))) {
          md.appendMarkdown(`- ❌ TypeScript types may become unsafe\n`);
        }

        if (problems.some((p) => p.includes("null"))) {
          md.appendMarkdown(`- ⚠ Null checks required in components\n`);
        }

        if (problems.some((p) => p.includes("mixed types"))) {
          md.appendMarkdown(
            `- ⚠ Union types will be generated (harder to use)\n`,
          );
        }

        md.appendMarkdown(`\n`);
      } else {
        md.appendMarkdown(`**✅ STRUCTURE IS STABLE**\n\n`);
      }

      md.appendMarkdown(`**⚠ Detected Problems**\n\n`);

      // ⚠ ISSUES (HIGH VISIBILITY)
      if (problems.length > 0) {
        md.appendMarkdown(`---\n\n`);
        md.appendMarkdown(`**⚠ Issues**\n\n`);

        problems.slice(0, 4).forEach((p) => {
          const clean = p.replace(/❗|⚠/g, "").trim();

          md.appendMarkdown(`> ❗ **${clean}**\n\n`);
        });

        md.appendMarkdown(`\n`);
      }

      // 💡 WHY (short + readable)
      if (explanation) {
        md.appendMarkdown(`---\n\n`);
        md.appendMarkdown(`**💡 Why this happens**\n\n`);

        const shortExplanation = explanation.split("\n").slice(0, 2).join("\n");

        md.appendMarkdown(`${shortExplanation}\n\n`);
      }

      // 🚨 IMPACT (stronger than warning)
      if (problems.length > 0) {
        md.appendMarkdown(`---\n\n`);
        md.appendMarkdown(`**🚨 What may break**\n\n`);

        md.appendMarkdown(
          `- ❌ <b>UI can break</b> if it expects missing fields\n`,
        );
        md.appendMarkdown(`- ❌ <b>TypeScript becomes unreliable</b>\n\n`);
      }

      // 📦 TYPES PREVIEW (clean block)
      if (preview) {
        md.appendMarkdown(`---\n\n`);
        md.appendMarkdown(`**📦 Types Preview**\n\n`);

        md.appendCodeblock(preview, "ts");

        md.appendMarkdown(`<sub>Generated from current JSON shape</sub>\n\n`);
      }

      // 🔥 ACTIONS (control layer)
      md.appendMarkdown(`---\n\n`);
      md.appendMarkdown(`### ⚡ Actions\n\n`);

      if (hasChanges) {
        md.appendMarkdown(
          `⚡ **[Fix JSON Structure](command:jsonLens.applyFix)**\n\n`,
        );
      } else {
        md.appendMarkdown(`✅ JSON already clean\n\n`);
      }

      // md.appendMarkdown(
      //   `👁 **[Preview Types](command:jsonLens.previewGenerate)**\n\n`,
      // );

      md.appendMarkdown(
        `📦 **[Generate full Types + Zod](command:jsonLens.generate)**\n\n`,
      );

      const hover = new vscode.Hover(md);

      lastText = text;
      lastResult = hover;

      console.log("HOVER OK");

      return hover;
    } catch (err) {
      console.error("HOVER ERROR:", err);
      return null;
    }
  }
}
