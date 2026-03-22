import * as vscode from "vscode";

export const criticalDecoration = vscode.window.createTextEditorDecorationType({
  textDecoration: "underline wavy #ff4d4f",
  overviewRulerColor: "#ff4d4f",
  overviewRulerLane: vscode.OverviewRulerLane.Right,
});

export const warningDecoration = vscode.window.createTextEditorDecorationType({
  textDecoration: "underline wavy #faad14",
  overviewRulerColor: "#faad14",
  overviewRulerLane: vscode.OverviewRulerLane.Right,
});
