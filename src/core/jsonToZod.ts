type GenerateOptions = {
  mode?: "strict" | "loose";
};

type PrimitiveKind = "string" | "number" | "boolean" | "null" | "unknown";

type ZodNode =
  | { kind: "primitive"; type: PrimitiveKind }
  | { kind: "array"; item: ZodNode }
  | { kind: "object"; fields: Record<string, ObjectField> }
  | { kind: "union"; options: ZodNode[] };

type ObjectField = {
  node: ZodNode;
  optional: boolean;
  nullable: boolean;
};

type SchemaEntry = {
  name: string;
  node: Extract<ZodNode, { kind: "object" }>;
  signature: string;
};

export function jsonToZod(
  json: unknown,
  rootName = "RootObject",
  options: GenerateOptions = { mode: "strict" },
): string {
  const rootNode = analyzeValue(json);

  const registry = new Map<string, SchemaEntry>();
  collectObjectSchemas(rootNode, registry, rootName, true);

  const entries = Array.from(registry.values());

  const nonRoot = entries.filter((e) => e.name !== rootName);
  const root = entries.find((e) => e.name === rootName);

  const schemaBlocks = nonRoot.map(
    (e) =>
      `const ${e.name}Schema = ${renderObjectSchema(e.node, registry, e.name, options)};`,
  );

  const rootSchema = root
    ? `const ${rootName}Schema = ${renderObjectSchema(root.node, registry, rootName, options)};`
    : `const ${rootName}Schema = ${renderNode(rootNode, registry, rootName, options)};`;

  return [
    `import { z } from "zod";`,
    "",
    ...schemaBlocks,
    ...(schemaBlocks.length ? [""] : []),
    rootSchema,
  ].join("\n");
}

function analyzeValue(value: unknown): ZodNode {
  if (value === null) return { kind: "primitive", type: "null" };

  if (Array.isArray(value)) return analyzeArray(value);

  if (typeof value === "object")
    return analyzeObject(value as Record<string, unknown>);

  if (typeof value === "string") return { kind: "primitive", type: "string" };
  if (typeof value === "number") return { kind: "primitive", type: "number" };
  if (typeof value === "boolean") return { kind: "primitive", type: "boolean" };

  return { kind: "primitive", type: "unknown" };
}

function analyzeArray(arr: unknown[]): ZodNode {
  if (arr.length === 0) {
    return { kind: "array", item: { kind: "primitive", type: "unknown" } };
  }

  const itemNodes = arr.map(analyzeValue);
  const merged = mergeNodes(itemNodes);

  return { kind: "array", item: merged };
}

function analyzeObject(
  obj: Record<string, unknown>,
): Extract<ZodNode, { kind: "object" }> {
  const fields: Record<string, ObjectField> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value === null) {
      fields[key] = {
        node: { kind: "primitive", type: "null" },
        optional: false,
        nullable: false, // ✅ FIX
      };
    } else {
      fields[key] = {
        node: analyzeValue(value),
        optional: false,
        nullable: false,
      };
    }
  }

  return { kind: "object", fields };
}

function mergeNodes(nodes: ZodNode[]): ZodNode {
  const unique = dedupeNodes(nodes);

  if (unique.length === 1) return unique[0];

  if (unique.every((n) => n.kind === "object")) {
    return {
      kind: "union",
      options: unique,
    };
  }

  return {
    kind: "union",
    options: unique,
  };
}

function dedupeNodes(nodes: ZodNode[]): ZodNode[] {
  const map = new Map<string, ZodNode>();

  for (const node of nodes) {
    map.set(JSON.stringify(node), node);
  }

  return Array.from(map.values());
}

function collectObjectSchemas(
  node: ZodNode,
  registry: Map<string, SchemaEntry>,
  name: string,
  isRoot = false,
) {
  if (node.kind === "object") {
    for (const [k, f] of Object.entries(node.fields)) {
      collectObjectSchemas(f.node, registry, k);
    }

    const sig = JSON.stringify(node);

    if (!registry.has(sig)) {
      const baseName = isRoot ? name : singularize(name);

      //build name from fields
      let smartName = capitalize(baseName);

      if (!isRoot) {
        const fieldKeys = Object.keys(node.fields);

        if (fieldKeys.length <= 2) {
          const suffix = fieldKeys
            .map((k) => {
              const field = node.fields[k];

              // differentiate by type
              if (
                field.node.kind === "primitive" &&
                field.node.type === "null"
              ) {
                return capitalize(singularize(k)) + "Null";
              }

              return capitalize(singularize(k));
            })
            .join("");

          if (!smartName.endsWith(suffix)) {
            smartName += suffix;
          }
        }
      }

      const uniqueName = ensureUniqueName(smartName, registry);

      registry.set(sig, {
        name: uniqueName,
        node,
        signature: sig,
      });
    }
  }

  if (node.kind === "array") {
    collectObjectSchemas(node.item, registry, name);
  }

  if (node.kind === "union") {
    node.options.forEach((o) => collectObjectSchemas(o, registry, name));
  }
}

function singularize(value: string): string {
  if (value.endsWith("ies")) {
    return value.slice(0, -3) + "y";
  }

  if (value.endsWith("ses")) {
    return value.slice(0, -2);
  }

  if (value.endsWith("s") && !value.endsWith("ss")) {
    return value.slice(0, -1);
  }

  return value;
}

function ensureUniqueName(
  base: string,
  registry: Map<string, SchemaEntry>,
): string {
  const used = new Set(Array.from(registry.values()).map((e) => e.name));

  if (!used.has(base)) return base;

  let i = 1;
  while (used.has(`${base}${i}`)) i++;

  return `${base}${i}`;
}
function renderObjectSchema(
  node: Extract<ZodNode, { kind: "object" }>,
  registry: Map<string, SchemaEntry>,
  currentName: string,
  options: GenerateOptions,
): string {
  const lines = Object.entries(node.fields).map(([k, f]) => {
    let v = renderNode(f.node, registry, currentName, options);

    if (f.nullable) v += `.nullable()`;
    if (f.optional) v += `.optional()`;

    return `${k}: ${v}`;
  });

  return `z.object({\n  ${lines.join(",\n  ")}\n})`;
}

function renderNode(
  node: ZodNode,
  registry: Map<string, SchemaEntry>,
  currentName: string,
  options: GenerateOptions,
): string {
  switch (node.kind) {
    case "primitive":
      return renderPrimitive(node.type);

    case "array":
      return `z.array(${renderNode(node.item, registry, currentName, options)})`;
    case "union": {
      //  LOOSE MODE
      if (
        options.mode === "loose" &&
        node.options.every((o) => o.kind === "object")
      ) {
        const merged = mergeUnionObjects(
          node.options as Extract<ZodNode, { kind: "object" }>[],
        );

        return renderNode(merged, registry, currentName, options);
      }

      // STRICT MODE (default)
      return `z.union([${node.options
        .map((o) => renderNode(o, registry, currentName, options))
        .join(", ")}])`;
    }

    case "object": {
      const sig = JSON.stringify(node);
      const found = registry.get(sig);

      if (found && found.name !== currentName) {
        return `${found.name}Schema`;
      }

      return renderObjectSchema(node, registry, currentName, options);
    }
  }
}

function mergeUnionObjects(
  nodes: Extract<ZodNode, { kind: "object" }>[],
): Extract<ZodNode, { kind: "object" }> {
  const allKeys = new Set<string>();

  nodes.forEach((n) => {
    Object.keys(n.fields).forEach((k) => allKeys.add(k));
  });

  const fields: Record<string, ObjectField> = {};

  for (const key of allKeys) {
    const present = nodes
      .map((n) => n.fields[key])
      .filter(Boolean) as ObjectField[];

    const optional = present.length < nodes.length;

    const hasExplicitNullable = present.some((p) => p.nullable);
    const hasNullNode = present.some(
      (p) => p.node.kind === "primitive" && p.node.type === "null",
    );

    const nonNullNodes = present
      .map((p) => p.node)
      .filter((node) => !(node.kind === "primitive" && node.type === "null"));

    let node: ZodNode;
    let nullable = hasExplicitNullable || hasNullNode;

    if (nonNullNodes.length === 0) {
      node = { kind: "primitive", type: "null" };
      nullable = false;
    } else {
      node = mergeNodes(nonNullNodes);
    }

    fields[key] = {
      node,
      optional,
      nullable,
    };
  }

  return { kind: "object", fields };
}

function renderPrimitive(type: PrimitiveKind): string {
  switch (type) {
    case "string":
      return "z.string()";
    case "number":
      return "z.number()";
    case "boolean":
      return "z.boolean()";
    case "null":
      return "z.null()";
    default:
      return "z.unknown()";
  }
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
