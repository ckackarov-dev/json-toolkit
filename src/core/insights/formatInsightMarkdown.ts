import {
  generateSmartFixes,
  getHighConfidenceFixes,
} from "../fixes/generateSmartFixes";
import type { InsightRuleResult } from "./types";

function getSeverityIcon(severity: InsightRuleResult["severity"]): string {
  switch (severity) {
    case "critical":
      return "❌";
    case "warning":
      return "⚠";
    case "info":
    default:
      return "ℹ️";
  }
}

function extractFieldInsights(problems: string[]): string[] {
  return problems
    .filter((p) => p.includes("appears in"))
    .map((p) => {
      const match = p.match(/root\.(.*?)\: (.*?) appears in (\d+)\/(\d+)/);

      if (!match) return null;

      const [, path, field, count, total] = match;

      const missing = Number(total) - Number(count);
      const percentage = Math.round((missing / Number(total)) * 100);

      const cleanPath = path.replace(/^root\./, "");

      return `${cleanPath}[].${field} → optional (missing ${percentage}%)`;
    })
    .filter(Boolean) as string[];
}

export function formatInsightMarkdown(
  insights: InsightRuleResult[],
  problems: string[],
  advanced: {
    numeric: any[];
    shape: any[];
    deep: any[];
  } = { numeric: [], shape: [], deep: [] },
): string | null {
  if (!insights.length) return null;

  // 🎯 PRIMARY / SECONDARY
  const primary =
    insights.find((i) => i.severity === "critical") || insights[0];

  const secondary = insights.find(
    (i) => i !== primary && i.severity !== "info",
  );

  // 🔥 ADVANCED ISSUES (NEW LAYER)
  const advancedFieldInsights = [
    ...advanced.numeric.map((p) => p.message),
    ...advanced.shape.map((p) => p.message),
    ...advanced.deep.map((p) => p.message),
  ];

  // 🔥 BASE FIELD INSIGHTS
  const baseFieldInsights = [
    ...extractFieldInsights(problems),
    ...insights
      .filter((i) => i.id.startsWith("mixed-field-type"))
      .map((i) => {
        const base = i.summary;

        const relatedNumeric = insights.find(
          (x) =>
            x.title === "Numeric string detected" &&
            x.meta?.field === i.meta?.field,
        );

        if (relatedNumeric) {
          return base + "\n    ↳ numeric string detected";
        }

        return base;
      }),
  ];

  // 🔥 FINAL MERGED (SINGLE SOURCE OF TRUTH)
  const fieldInsights = [...advancedFieldInsights, ...baseFieldInsights];
  // 🔥 SMART FIXES
  const allFixes = generateSmartFixes(advanced);
  const safeFixes = getHighConfidenceFixes(allFixes);
  let output = `### 🧠 API Insight\n\n`;

  // 🔥 HEADLINE
  output += `## ${getSeverityIcon(primary.severity)} ${primary.title}\n\n`;

  // 🔥 KEY ISSUES
  if (fieldInsights.length) {
    output += `### ⚠ Key issues\n`;
    output += fieldInsights
      .slice(0, 3)
      .map((f: string) => `- ${f}`)
      .join("\n");
    output += `\n\n`;
  }

  // 🔥 WHAT WILL BREAK
  if (primary.risks.length) {
    output += `### ⚠ What will break\n`;
    output += primary.risks
      .slice(0, 3)
      .map((r: string) => `- ${r}`)
      .join("\n");
    output += `\n\n`;
  }

  // 🔥 FIX
  if (safeFixes.length > 0) {
    output += `### 💡 Suggested fix\n`;

    output += safeFixes
      .slice(0, 2)
      .map((f) => `- ${f.message}`)
      .join("\n");

    output += `\n\n`;
  } else if (primary.actions.length) {
    output += `### 💡 Safest fix\n`;

    output += primary.actions
      .slice(0, 2)
      .map((a: string) => `- ${a}`)
      .join("\n");

    output += `\n\n`;
  }

  // 🔹 SECONDARY
  if (secondary) {
    output += `— — —\n\n`;
    output += `**${getSeverityIcon(secondary.severity)} ${secondary.title}**\n\n`;
    output += secondary.summary + `\n\n`;
  }

  return output;
}
