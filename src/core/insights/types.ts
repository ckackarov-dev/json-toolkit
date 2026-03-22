export type InsightSeverity = "info" | "warning" | "critical";
export type InsightConfidence = "low" | "medium" | "high";

export type InsightRuleResult = {
  id: string;
  title: string;
  severity: InsightSeverity;
  confidence: InsightConfidence;
  summary: string;
  risks: string[];
  actions: string[];

  meta?: {
    field?: string;
    path?: string;
  };
};

export type JsonPathIssue = {
  path: string;
  message: string;
};
