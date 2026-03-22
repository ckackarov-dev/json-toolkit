import { detectNumericStringIssues } from "./numericString";
import { detectObjectShapeIssues } from "./objectShape";
import { detectDeepOptionalIssues } from "./deepOptional";

export function detectAllProblems(data: unknown) {
  const numeric = detectNumericStringIssues(data);
  const shape = detectObjectShapeIssues(data);
  const deep = detectDeepOptionalIssues(data);

  return {
    numeric,
    shape,
    deep,
  };
}
