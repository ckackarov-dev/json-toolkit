type PrimitiveKind = "string" | "number" | "boolean" | "null" | "unknown";

type GenerateOptions = {
  safeMode?: boolean;
};

type GenerateMode = "full" | "types";

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

export function jsonToTypesAndZod(
  json: unknown,
  rootName = "RootObject",
  mode: GenerateMode = "full",
  safeMode = false,
): string {
  const registry = new Map<string, SchemaEntry>();

  const rootNode = analyzeValue(json, rootName);

  collectObjectSchemas(rootNode, registry, rootName, true);

  const typeBlocks: string[] = [];

  for (const entry of registry.values()) {
    const typeBody = renderObjectType(
      entry.node,
      registry,
      entry.name,
      safeMode,
    );
    typeBlocks.push(`type ${entry.name} = ${typeBody};`);
  }

  const schemaBlocks: string[] = [];

  for (const entry of registry.values()) {
    const schemaBody = renderObjectSchema(
      entry.node,
      registry,
      entry.name,
      safeMode,
    );
    schemaBlocks.push(`const ${entry.name}Schema = ${schemaBody};`);
  }

  const typesOutput = joinBlocks(typeBlocks).join("\n");
  const schemasOutput = joinBlocks(schemaBlocks).join("\n\n");

  if (mode === "types") {
    return typesOutput.trim();
  }

  const finalOutput = `import { z } from "zod";

${typesOutput}

${schemasOutput}`.trim();

  if (!finalOutput || finalOutput.length < 20) {
    return `// ⚠️ No types could be generated from input\n\nimport { z } from "zod";`;
  }

  return finalOutput;
}

function mapPrimitive(value: unknown): PrimitiveKind {
  const t = typeof value;

  if (t === "string") return "string";
  if (t === "number") return "number";
  if (t === "boolean") return "boolean";

  return "unknown";
}

function analyzeValue(value: unknown, name: string): ZodNode {
  // 🟢 NULL (FIXED)
  if (value === null) {
    return {
      kind: "primitive",
      type: "null",
    };
  }

  // 🟢 PRIMITIVE
  if (typeof value !== "object") {
    return { kind: "primitive", type: mapPrimitive(value) };
  }

  // 🟡 ARRAY
  if (Array.isArray(value)) {
    return analyzeArray(value, name);
  }

  // 🔵 OBJECT
  return analyzeObject(value as Record<string, unknown>, name);
}

function analyzeArray(arr: unknown[], keyHint = "Item"): ZodNode {
  if (arr.length === 0) {
    return {
      kind: "array",
      item: { kind: "primitive", type: "unknown" },
    };
  }

  const nonNullItems = arr.filter((item) => item !== null);

  if (nonNullItems.length > 0 && nonNullItems.every(isPlainObject)) {
    const mergedObject = mergeObjectArray(
      nonNullItems as Record<string, unknown>[],
      singularize(keyHint),
    );

    return {
      kind: "array",
      item: mergedObject,
    };
  }

  const itemNodes = arr.map((item) => analyzeValue(item, singularize(keyHint)));
  const mergedItemNode = mergeNodes(itemNodes, singularize(keyHint));

  return {
    kind: "array",
    item: mergedItemNode,
  };
}

function analyzeObject(
  obj: Record<string, unknown>,
  _keyHint = "Object",
): Extract<ZodNode, { kind: "object" }> {
  const fields: Record<string, ObjectField> = {};

  for (const [key, value] of Object.entries(obj)) {
    const childKey = pascalCase(key);

    // represent null as actual node
    if (value === null) {
      fields[key] = {
        node: { kind: "primitive", type: "null" },
        optional: false,
        nullable: false,
      };
      continue;
    }

    const analyzed = analyzeValue(value, childKey);

    fields[key] = {
      node: analyzed,
      optional: false,
      nullable: false,
    };
  }

  return {
    kind: "object",
    fields,
  };
}

function mergeObjectArray(
  objects: Record<string, unknown>[],
  _keyHint = "Item",
): Extract<ZodNode, { kind: "object" }> {
  const allKeys = new Set<string>();

  for (const obj of objects) {
    Object.keys(obj).forEach((key) => allKeys.add(key));
  }

  const fields: Record<string, ObjectField> = {};

  for (const key of allKeys) {
    const presentValues = objects
      .filter((obj) => Object.prototype.hasOwnProperty.call(obj, key))
      .map((obj) => obj[key]);

    const optional = presentValues.length < objects.length;
    const nullable = presentValues.some((value) => value === null);

    const nonNullValues = presentValues.filter((value) => value !== null);
    const childKeyHint = pascalCase(singularize(key));

    let node: ZodNode;

    if (nonNullValues.length === 0) {
      node = { kind: "primitive", type: "unknown" };
    } else {
      const analyzedNodes = nonNullValues.map((value) =>
        analyzeValue(value, childKeyHint),
      );

      node = mergeNodes(analyzedNodes, childKeyHint);
    }

    // preserve null INSIDE node
    if (nullable) {
      node = mergeNodes(
        [node, { kind: "primitive", type: "null" }],
        childKeyHint,
      );
    }

    fields[key] = {
      node,
      optional,
      nullable: false,
    };
  }

  return {
    kind: "object",
    fields,
  };
}

function mergeNodes(nodes: ZodNode[], keyHint = "Item"): ZodNode {
  if (nodes.length === 0) {
    return { kind: "primitive", type: "unknown" };
  }

  const normalizedNodes = nodes.map(normalizeNode);
  const uniqueNodes = dedupeNodes(normalizedNodes);

  if (uniqueNodes.length === 1) {
    return uniqueNodes[0];
  }

  const allObjects = uniqueNodes.every((node) => node.kind === "object");
  if (allObjects) {
    return mergeObjectNodes(
      uniqueNodes as Extract<ZodNode, { kind: "object" }>[],
      keyHint,
    );
  }

  const allArrays = uniqueNodes.every((node) => node.kind === "array");
  if (allArrays) {
    const mergedItems = mergeNodes(
      uniqueNodes.map(
        (node) => (node as Extract<ZodNode, { kind: "array" }>).item,
      ),
      singularize(keyHint),
    );

    return {
      kind: "array",
      item: mergedItems,
    };
  }

  return {
    kind: "union",
    options: uniqueNodes,
  };
}
function mergeObjectNodes(
  nodes: Extract<ZodNode, { kind: "object" }>[],
  _keyHint = "Item",
): Extract<ZodNode, { kind: "object" }> {
  const allKeys = new Set<string>();

  for (const node of nodes) {
    Object.keys(node.fields).forEach((key) => allKeys.add(key));
  }

  const mergedFields: Record<string, ObjectField> = {};

  for (const key of allKeys) {
    const existingFields = nodes
      .map((node) => node.fields[key])
      .filter(Boolean) as ObjectField[];

    const optional =
      existingFields.length < nodes.length ||
      existingFields.some((field) => field.optional);

    const hasExplicitNullable = existingFields.some((field) => field.nullable);
    const hasNullNode = existingFields.some(
      (field) => field.node.kind === "primitive" && field.node.type === "null",
    );

    const nonNullNodes = existingFields
      .map((field) => field.node)
      .filter((node) => !(node.kind === "primitive" && node.type === "null"));

    let mergedNode: ZodNode;
    let nullable = hasExplicitNullable || hasNullNode;

    if (nonNullNodes.length === 0) {
      mergedNode = { kind: "primitive", type: "null" };
      nullable = false;
    } else {
      mergedNode = mergeNodes(nonNullNodes, pascalCase(singularize(key)));
    }

    mergedFields[key] = {
      node: mergedNode,
      optional,
      nullable,
    };
  }

  return {
    kind: "object",
    fields: mergedFields,
  };
}

function normalizeNode(node: ZodNode): ZodNode {
  if (node.kind !== "union") {
    return node;
  }

  const flatOptions = node.options.flatMap((option) =>
    option.kind === "union" ? option.options : [option],
  );

  const map = new Map<string, ZodNode>();

  for (const option of flatOptions) {
    const sig = getNodeSignature(option);
    if (!map.has(sig)) {
      map.set(sig, option);
    }
  }

  const unique = Array.from(map.values());

  if (unique.length === 1) {
    return unique[0];
  }

  return {
    kind: "union",
    options: unique,
  };
}
function normalizeUnion(types: string[]) {
  const unique = Array.from(new Set(types));

  if (unique.includes("string") && unique.includes("number")) {
    return {
      type: "string",
      comment: "⚠ normalized from (string | number)",
    };
  }

  return {
    type: unique.join(" | "),
  };
}
function dedupeNodes(nodes: ZodNode[]): ZodNode[] {
  const map = new Map<string, ZodNode>();

  for (const node of nodes) {
    map.set(getNodeSignature(node), node);
  }

  return Array.from(map.values());
}

function collectObjectSchemas(
  node: ZodNode,
  registry: Map<string, SchemaEntry>,
  suggestedName: string,
  isRoot = false,
): void {
  // 🟢 OBJECT
  if (node.kind === "object") {
    // 1️⃣ Traverse children FIRST
    for (const [fieldKey, field] of Object.entries(node.fields)) {
      collectObjectSchemas(
        field.node,
        registry,
        pascalCase(singularize(fieldKey)),
      );
    }

    // Signature
    const signature = getObjectSignature(node);

    const existing = registry.get(signature);
    if (existing) {
      return;
    }

    //  Naming
    const baseName = pascalCase(
      isRoot ? suggestedName : singularize(suggestedName),
    );

    const finalName = ensureUniqueName(baseName, registry);

    registry.set(signature, {
      name: finalName,
      node,
      signature,
    });

    (node as any).__name = finalName;

    return;
  }

  // 🟡 ARRAY
  if (node.kind === "array") {
    if (node.item.kind === "union") {
      for (const option of node.item.options) {
        collectObjectSchemas(
          option,
          registry,
          pascalCase(singularize(suggestedName)),
        );
      }
      return;
    }

    collectObjectSchemas(
      node.item,
      registry,
      pascalCase(singularize(suggestedName)),
    );
    return;
  }

  // 🔵 UNION
  if (node.kind === "union") {
    for (const option of node.options) {
      collectObjectSchemas(option, registry, suggestedName);
    }
  }
}

function renderObjectType(
  node: Extract<ZodNode, { kind: "object" }>,
  registry: Map<string, SchemaEntry>,
  currentName: string,
  safeMode: boolean,
): string {
  const lines = Object.entries(node.fields).map(([key, field]) => {
    const optionalMark = field.optional ? "?" : "";

    let typeValue = renderTypeNode(field.node, registry, currentName, safeMode);

    if (field.nullable) {
      typeValue = `${typeValue} | null`;
    }
    if (safeMode && key === "bottom_widget") {
      return `${key}?: unknown | null; // ⚠ overlay dynamic`;
    }

    return `${key}${optionalMark}: ${typeValue};`;
  });

  return `{\n${indent(lines.join("\n"))}\n}`;
}

function renderTypeNode(
  node: ZodNode,
  registry: Map<string, SchemaEntry>,
  currentName: string,
  safeMode: boolean,
): string {
  switch (node.kind) {
    case "primitive":
      return node.type;

    case "array": {
      const itemType = renderTypeNode(
        node.item,
        registry,
        currentName,
        safeMode,
      );

      if (needsParensForArrayItem(node.item)) {
        return `(${itemType})[]`;
      }

      return `${itemType}[]`;
    }

    case "object": {
      return (node as any).__name || "unknown";
    }

    case "union": {
      const types = node.options.map((opt) =>
        renderTypeNode(opt, registry, currentName, safeMode),
      );

      if (safeMode) {
        const unique = Array.from(new Set(types));
        const cleaned = unique.map((t) => t.trim());

        if (cleaned.includes("string") && cleaned.includes("number")) {
          return "string /* ⚠ normalized from (string | number) */";
        }

        return unique.join(" | ");
      }

      return types.join(" | ");
    }

    default:
      return "unknown";
  }
}

function renderObjectSchema(
  node: Extract<ZodNode, { kind: "object" }>,
  registry: Map<string, SchemaEntry>,
  currentName: string,
  safeMode: boolean,
): string {
  const entries = Object.entries(node.fields);

  if (entries.length === 0) {
    return "z.object({}).strict()";
  }

  const lines = entries.map(([key, field]) => {
    let value = renderSchemaNode(field.node, registry, currentName, safeMode);

    if (field.nullable) {
      value += ".nullable()";
    }

    if (field.optional) {
      value += ".optional()";
    }

    return `${key}: ${value}`;
  });

  return `z.object({\n${indent(lines.join(",\n"))}\n}).strict()`;
}

function renderSchemaNode(
  node: ZodNode,
  registry: Map<string, SchemaEntry>,
  currentName: string,
  safeMode: boolean,
): string {
  switch (node.kind) {
    case "primitive":
      if (node.type === "null") {
        return "z.null()";
      }
      return `z.${node.type}()`;

    case "array":
      return `z.array(${renderSchemaNode(
        node.item,
        registry,
        currentName,
        safeMode,
      )})`;

    case "object": {
      const name = (node as any).__name;
      return name ? `${name}Schema` : "z.unknown()";
    }

    case "union": {
      const options = node.options
        .filter((opt) => !(opt.kind === "primitive" && opt.type === "null"))
        .map((opt) => renderSchemaNode(opt, registry, currentName, safeMode));

      if (safeMode) {
        return `${options[0]} // ⚠ normalized`;
      }

      return `z.union([${options.join(", ")}])`;
    }

    default:
      return "z.unknown()";
  }
}

function renderPrimitiveType(type: PrimitiveKind): string {
  switch (type) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "null":
      return "null";
    default:
      return "unknown";
  }
}

function renderPrimitiveSchema(type: PrimitiveKind): string {
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

function needsParensForArrayItem(node: ZodNode): boolean {
  return node.kind === "union";
}

function getNodeSignature(node: ZodNode): string {
  switch (node.kind) {
    case "primitive":
      return node.type;

    case "array":
      return `array:${getNodeSignature(node.item)}`;

    case "union":
      return `union:${node.options.map(getNodeSignature).sort().join("|")}`;

    case "object":
      return getObjectSignature(node);

    default:
      return "unknown";
  }
}
function getObjectSignature(
  node: Extract<ZodNode, { kind: "object" }>,
): string {
  const entries = Object.entries(node.fields).map(([key, field]) => {
    return `${key}:${getNodeSignature(field.node)}:${
      field.optional ? "opt" : "req"
    }:${field.nullable ? "null" : "non-null"}`;
  });

  return `object:{${entries.sort().join(",")}}`;
}

function ensureUniqueName(
  baseName: string,
  registry: Map<string, SchemaEntry>,
): string {
  const usedNames = new Set(
    Array.from(registry.values()).map((entry) => entry.name),
  );

  if (!usedNames.has(baseName)) {
    return baseName;
  }

  let counter = 1;
  while (usedNames.has(`${baseName}${counter}`)) {
    counter += 1;
  }

  return `${baseName}${counter}`;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function pascalCase(value: string): string {
  return value
    .replace(/[_\-\s]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function singularize(value: string): string {
  if (value.endsWith("ies")) {
    return `${value.slice(0, -3)}y`;
  }

  if (value.endsWith("ses")) {
    return value.slice(0, -2);
  }

  if (value.endsWith("s") && !value.endsWith("ss")) {
    return value.slice(0, -1);
  }

  return value;
}

function indent(value: string, spaces = 2): string {
  const prefix = " ".repeat(spaces);

  return value
    .split("\n")
    .map((line) => `${prefix}${line}`)
    .join("\n");
}

function joinBlocks(blocks: string[]): string[] {
  return blocks.flatMap((block, index) =>
    index === 0 ? [block] : ["", block],
  );
}
