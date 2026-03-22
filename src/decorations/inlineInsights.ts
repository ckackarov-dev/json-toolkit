import * as vscode from "vscode";

// =====================================================
// 🎨 Decoration style
// =====================================================

export const insightDecoration = vscode.window.createTextEditorDecorationType({
  after: {
    margin: "0 0 0 1rem",
    color: "#888",
    fontStyle: "italic",
  },
});

// =====================================================
// 🧠 Insight generator
// =====================================================

function getInlineInsight(parsed: any): string | null {
  if (!Array.isArray(parsed)) return null;
  if (parsed.length === 0) return null;

  const shapes = new Map<string, number>();
  const fieldCounts: Record<string, number> = {};
  const fieldTypes: Record<string, Set<string>> = {};

  parsed.forEach((item) => {
    if (typeof item !== "object" || item === null) return;

    const keys = Object.keys(item).sort();
    const shapeKey = keys.join("|");

    shapes.set(shapeKey, (shapes.get(shapeKey) || 0) + 1);

    keys.forEach((k) => {
      const value = item[k];

      // count presence
      fieldCounts[k] = (fieldCounts[k] || 0) + 1;

      // track types
      if (!fieldTypes[k]) {
        fieldTypes[k] = new Set();
      }

      const type =
        value === null ? "null" : Array.isArray(value) ? "array" : typeof value;

      fieldTypes[k].add(type);
    });
  });

  const total = parsed.length;

  // =====================================================
  // 🔥 DETECT ISSUES
  // =====================================================

  const shapeCount = shapes.size;

  const optionalFields = Object.entries(fieldCounts)
    .filter(([_, count]) => count < total)
    .map(([key, count]) => ({
      key,
      missingPercent: Math.round(((total - count) / total) * 100),
    }))
    .sort((a, b) => b.missingPercent - a.missingPercent);

  const typeConflicts = Object.entries(fieldTypes)
    .filter(([_, types]) => types.size > 1)
    .map(([key, types]) => ({
      key,
      types: Array.from(types).join(" | "),
    }));

  // =====================================================
  // 🎯 BUILD NEXT-GEN INSIGHT
  // =====================================================

  let parts: string[] = [];

  // 🥇 PRIORITY: type conflicts (strongest signal)
  if (typeConflicts.length > 0) {
    const top = typeConflicts[0];
    parts.push(`${top.key} type conflict (${top.types})`);
  }

  // 🥈 shapes
  else if (shapeCount > 1) {
    parts.push(`${shapeCount} shapes`);
  }

  // 🥉 optional
  if (optionalFields.length > 0 && parts.length < 2) {
    const top = optionalFields[0];
    parts.push(`${top.key} missing in ${top.missingPercent}%`);
  }

  if (parts.length === 0) return null;

  return `🧠 ${parts.join(" • ")}`;
}

// =====================================================
// ⚡ Apply decoration
// =====================================================

export function updateInlineInsights(editor: vscode.TextEditor) {
  const text = editor.document.getText();

  let parsed: any;

  try {
    parsed = JSON.parse(text);
  } catch {
    editor.setDecorations(insightDecoration, []);
    return;
  }

  const insight = getInlineInsight(parsed);

  if (!insight) {
    editor.setDecorations(insightDecoration, []);
    return;
  }

  // 👇 Always show at top (safe & deterministic)
  const firstLine = new vscode.Range(
    new vscode.Position(0, 0),
    new vscode.Position(0, 0),
  );

  editor.setDecorations(insightDecoration, [
    {
      range: firstLine,
      renderOptions: {
        after: {
          contentText: insight,
        },
      },
    },
  ]);
}
