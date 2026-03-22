type TreeNode = {
  key: string;
  children?: TreeNode[];
  type?: string;
};

export function buildStructureTree(data: any): string {
  function walk(node: any, depth = 0, key = "root"): string[] {
    const indent = "  ".repeat(depth);

    if (Array.isArray(node)) {
      if (node.length === 0) {
        return [`${indent}${key}[]: unknown[]`];
      }

      const first = node[0];
      const lines = [`${indent}${key}[]`];

      return [...lines, ...walk(first, depth + 1)];
    }

    if (typeof node === "object" && node !== null) {
      const lines = [`${indent}${key}`];

      for (const k in node) {
        const value = node[k];
        lines.push(...walk(value, depth + 1, k));
      }

      return lines;
    }

    return [`${indent}${key}: ${typeof node}`];
  }

  return walk(data).join("\n");
}
