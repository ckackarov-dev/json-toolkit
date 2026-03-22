import { Problem } from "./types";

export function buildSummary(problems: Problem[]) {
  return {
    critical: problems.filter((p) => p.severity === "critical").length,
    warning: problems.filter((p) => p.severity === "warning").length,
    info: problems.filter((p) => p.severity === "info").length,
  };
}
