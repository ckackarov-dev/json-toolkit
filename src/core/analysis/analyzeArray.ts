import { isPlainObject } from "../utils/isPlainObject";
import { Problem } from "./types";

// 🔧 helpers (local for now — later we can split to rules/)
function pushEmptyArray(path: string, problems: Problem[]) {
  problems.push({
    code: "EMPTY_ARRAY",
    severity: "warning",
    path,
    message: "Empty array",
    explanation: "Cannot infer element type",
    impact: "Will fallback to unknown[]",
  });
}

function getType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function allObjects(arr: unknown[]) {
  return arr.length > 0 && arr.every(isPlainObject);
}

function detectPrimitiveMismatch(
  arr: unknown[],
  path: string,
  problems: Problem[],
) {
  const types = new Set(arr.map(getType));

  const primitivesOnly = [...types].every(
    (t) => t !== "object" && t !== "array",
  );

  if (types.size > 1 && primitivesOnly) {
    problems.push({
      code: "INCONSISTENT_PRIMITIVE",
      severity: "critical",
      path,
      message: "Inconsistent primitive types",
      explanation: `Found multiple types: ${[...types].join(", ")}`,
      impact: "Will generate union type",
    });
  }
}

function detectMixedShapes(
  arr: Record<string, unknown>[],
  path: string,
  problems: Problem[],
) {
  const keySets = arr.map((obj) => Object.keys(obj));

  const allKeys = new Set(keySets.flat());

  const hasMismatch = keySets.some((keys) => keys.length !== allKeys.size);

  if (hasMismatch) {
    problems.push({
      code: "MIXED_OBJECT_SHAPES",
      severity: "warning",
      path,
      message: "Mixed object shapes in array",
      explanation: "Some fields exist only in subset of items",
      impact: "Will generate optional fields or union",
    });
  }
}

function detectNullables(arr: unknown[], path: string, problems: Problem[]) {
  const hasNull = arr.some((v) => v === null);
  const hasNonNull = arr.some((v) => v !== null);

  if (hasNull && hasNonNull) {
    problems.push({
      code: "NULLABLE_FIELD",
      severity: "warning",
      path,
      message: "Nullable field detected",
      explanation: "Value is null in some items",
      impact: "Will generate union with null",
    });
  }
}

// 👇 THIS is your main function
export function analyzeArray(
  arr: unknown[],
  path: string,
  problems: Problem[],
) {
  if (arr.length === 0) {
    pushEmptyArray(path, problems);
    return;
  }

  // 1️⃣ primitive mismatch
  detectPrimitiveMismatch(arr, path, problems);

  // 2️⃣ object shapes
  if (allObjects(arr)) {
    detectMixedShapes(arr as Record<string, unknown>[], path, problems);
  }

  // 3️⃣ nullable
  detectNullables(arr, path, problems);
}
