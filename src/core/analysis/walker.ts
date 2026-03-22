import { isPlainObject } from "../arrayUtils";
import { analyzeArray } from "./analyzeArray";
import { Problem } from "./types";

export function walkNode(node: unknown, path: string, problems: Problem[]) {
  if (Array.isArray(node)) {
    analyzeArray(node, path, problems);

    node.forEach((item, i) => {
      walkNode(item, `${path}[${i}]`, problems);
    });

    return;
  }

  if (isPlainObject(node)) {
    for (const [key, value] of Object.entries(node)) {
      walkNode(value, `${path}.${key}`, problems);
    }
  }
}
