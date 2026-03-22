export type ProblemSeverity = "critical" | "warning" | "info";

export type ProblemCode =
  | "INCONSISTENT_PRIMITIVE"
  | "MIXED_OBJECT_SHAPES"
  | "NULLABLE_FIELD"
  | "EMPTY_ARRAY"
  | "OBJECT_PRIMITIVE_MISMATCH"
  | "NESTED_SHAPE_MISMATCH";

export type Problem = {
  code: ProblemCode;
  severity: ProblemSeverity;

  path: string;
  // e.g. "users[].age"

  message: string;
  explanation: string;
  impact: string;

  meta?: Record<string, unknown>;
};

export type AnalysisResult = {
  problems: Problem[];

  summary: {
    critical: number;
    warning: number;
    info: number;
  };
};
