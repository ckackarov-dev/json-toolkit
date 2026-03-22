import { Problem } from "../types";

export function detectNestedShapeMismatch(
  arr: Record<string, unknown>[],
  path: string,
  problems: Problem[],
) {
  const shapeSignatures = arr.map((obj) =>
    JSON.stringify(Object.keys(obj).sort()),
  );

  const uniqueShapes = new Set(shapeSignatures);

  if (uniqueShapes.size > 1) {
    problems.push({
      code: "NESTED_SHAPE_MISMATCH",
      severity: "warning",
      path,
      message: "Nested object shape mismatch",
      explanation: "Objects have different internal structure",
      impact: "Will generate union or optional fields",
    });
  }
}
