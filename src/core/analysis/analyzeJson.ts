import { buildSummary } from "./summary";
import { AnalysisResult } from "./types";
import { walkNode } from "./walker";

export function analyzeJson(input: unknown): AnalysisResult {
  const problems: any[] = [];

  walkNode(input, "root", problems);

  return {
    problems,
    summary: buildSummary(problems),
  };
}
