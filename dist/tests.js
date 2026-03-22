"use strict";

// src/core/jsonToTypesAndZod.ts
function jsonToTypesAndZod(json, rootName = "RootObject", mode = "full", safeMode = false) {
  const registry = /* @__PURE__ */ new Map();
  const rootNode = analyzeValue(json, rootName);
  collectObjectSchemas(rootNode, registry, rootName, true);
  const typeBlocks = [];
  for (const entry of registry.values()) {
    const typeBody = renderObjectType(
      entry.node,
      registry,
      entry.name,
      safeMode
    );
    typeBlocks.push(`type ${entry.name} = ${typeBody};`);
  }
  const schemaBlocks = [];
  for (const entry of registry.values()) {
    const schemaBody = renderObjectSchema(
      entry.node,
      registry,
      entry.name,
      safeMode
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
    return `// \u26A0\uFE0F No types could be generated from input

import { z } from "zod";`;
  }
  return finalOutput;
}
function mapPrimitive(value) {
  const t = typeof value;
  if (t === "string") return "string";
  if (t === "number") return "number";
  if (t === "boolean") return "boolean";
  return "unknown";
}
function analyzeValue(value, name) {
  if (value === null) {
    return {
      kind: "primitive",
      type: "null"
    };
  }
  if (typeof value !== "object") {
    return { kind: "primitive", type: mapPrimitive(value) };
  }
  if (Array.isArray(value)) {
    return analyzeArray(value, name);
  }
  return analyzeObject(value, name);
}
function analyzeArray(arr, keyHint = "Item") {
  if (arr.length === 0) {
    return {
      kind: "array",
      item: { kind: "primitive", type: "unknown" }
    };
  }
  const nonNullItems = arr.filter((item) => item !== null);
  if (nonNullItems.length > 0 && nonNullItems.every(isPlainObject)) {
    const mergedObject = mergeObjectArray(
      nonNullItems,
      singularize(keyHint)
    );
    return {
      kind: "array",
      item: mergedObject
    };
  }
  const itemNodes = arr.map((item) => analyzeValue(item, singularize(keyHint)));
  const mergedItemNode = mergeNodes(itemNodes, singularize(keyHint));
  return {
    kind: "array",
    item: mergedItemNode
  };
}
function analyzeObject(obj, _keyHint = "Object") {
  const fields = {};
  for (const [key, value] of Object.entries(obj)) {
    const childKey = pascalCase(key);
    if (value === null) {
      fields[key] = {
        node: { kind: "primitive", type: "null" },
        optional: false,
        nullable: false
      };
      continue;
    }
    const analyzed = analyzeValue(value, childKey);
    fields[key] = {
      node: analyzed,
      optional: false,
      nullable: false
    };
  }
  return {
    kind: "object",
    fields
  };
}
function mergeObjectArray(objects, _keyHint = "Item") {
  const allKeys = /* @__PURE__ */ new Set();
  for (const obj of objects) {
    Object.keys(obj).forEach((key) => allKeys.add(key));
  }
  const fields = {};
  for (const key of allKeys) {
    const presentValues = objects.filter((obj) => Object.prototype.hasOwnProperty.call(obj, key)).map((obj) => obj[key]);
    const optional = presentValues.length < objects.length;
    const nullable = presentValues.some((value) => value === null);
    const nonNullValues = presentValues.filter((value) => value !== null);
    const childKeyHint = pascalCase(singularize(key));
    let node;
    if (nonNullValues.length === 0) {
      node = { kind: "primitive", type: "unknown" };
    } else {
      const analyzedNodes = nonNullValues.map(
        (value) => analyzeValue(value, childKeyHint)
      );
      node = mergeNodes(analyzedNodes, childKeyHint);
    }
    if (nullable) {
      node = mergeNodes(
        [node, { kind: "primitive", type: "null" }],
        childKeyHint
      );
    }
    fields[key] = {
      node,
      optional,
      nullable: false
    };
  }
  return {
    kind: "object",
    fields
  };
}
function mergeNodes(nodes, keyHint = "Item") {
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
      uniqueNodes,
      keyHint
    );
  }
  const allArrays = uniqueNodes.every((node) => node.kind === "array");
  if (allArrays) {
    const mergedItems = mergeNodes(
      uniqueNodes.map(
        (node) => node.item
      ),
      singularize(keyHint)
    );
    return {
      kind: "array",
      item: mergedItems
    };
  }
  return {
    kind: "union",
    options: uniqueNodes
  };
}
function mergeObjectNodes(nodes, _keyHint = "Item") {
  const allKeys = /* @__PURE__ */ new Set();
  for (const node of nodes) {
    Object.keys(node.fields).forEach((key) => allKeys.add(key));
  }
  const mergedFields = {};
  for (const key of allKeys) {
    const existingFields = nodes.map((node) => node.fields[key]).filter(Boolean);
    const optional = existingFields.length < nodes.length || existingFields.some((field) => field.optional);
    const hasExplicitNullable = existingFields.some((field) => field.nullable);
    const hasNullNode = existingFields.some(
      (field) => field.node.kind === "primitive" && field.node.type === "null"
    );
    const nonNullNodes = existingFields.map((field) => field.node).filter((node) => !(node.kind === "primitive" && node.type === "null"));
    let mergedNode;
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
      nullable
    };
  }
  return {
    kind: "object",
    fields: mergedFields
  };
}
function normalizeNode(node) {
  if (node.kind !== "union") {
    return node;
  }
  const flatOptions = node.options.flatMap(
    (option) => option.kind === "union" ? option.options : [option]
  );
  const map = /* @__PURE__ */ new Map();
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
    options: unique
  };
}
function dedupeNodes(nodes) {
  const map = /* @__PURE__ */ new Map();
  for (const node of nodes) {
    map.set(getNodeSignature(node), node);
  }
  return Array.from(map.values());
}
function collectObjectSchemas(node, registry, suggestedName, isRoot = false) {
  if (node.kind === "object") {
    for (const [fieldKey, field] of Object.entries(node.fields)) {
      collectObjectSchemas(
        field.node,
        registry,
        pascalCase(singularize(fieldKey))
      );
    }
    const signature = getObjectSignature(node);
    const existing = registry.get(signature);
    if (existing) {
      return;
    }
    const baseName = pascalCase(
      isRoot ? suggestedName : singularize(suggestedName)
    );
    const finalName = ensureUniqueName(baseName, registry);
    registry.set(signature, {
      name: finalName,
      node,
      signature
    });
    node.__name = finalName;
    return;
  }
  if (node.kind === "array") {
    if (node.item.kind === "union") {
      for (const option of node.item.options) {
        collectObjectSchemas(
          option,
          registry,
          pascalCase(singularize(suggestedName))
        );
      }
      return;
    }
    collectObjectSchemas(
      node.item,
      registry,
      pascalCase(singularize(suggestedName))
    );
    return;
  }
  if (node.kind === "union") {
    for (const option of node.options) {
      collectObjectSchemas(option, registry, suggestedName);
    }
  }
}
function renderObjectType(node, registry, currentName, safeMode) {
  const lines = Object.entries(node.fields).map(([key, field]) => {
    const optionalMark = field.optional ? "?" : "";
    let typeValue = renderTypeNode(field.node, registry, currentName, safeMode);
    if (field.nullable) {
      typeValue = `${typeValue} | null`;
    }
    if (safeMode && key === "bottom_widget") {
      return `${key}?: unknown | null; // \u26A0 overlay dynamic`;
    }
    return `${key}${optionalMark}: ${typeValue};`;
  });
  return `{
${indent(lines.join("\n"))}
}`;
}
function renderTypeNode(node, registry, currentName, safeMode) {
  switch (node.kind) {
    case "primitive":
      return node.type;
    case "array": {
      const itemType = renderTypeNode(
        node.item,
        registry,
        currentName,
        safeMode
      );
      if (needsParensForArrayItem(node.item)) {
        return `(${itemType})[]`;
      }
      return `${itemType}[]`;
    }
    case "object": {
      return node.__name || "unknown";
    }
    case "union": {
      const types = node.options.map(
        (opt) => renderTypeNode(opt, registry, currentName, safeMode)
      );
      if (safeMode) {
        const unique = Array.from(new Set(types));
        const cleaned = unique.map((t) => t.trim());
        if (cleaned.includes("string") && cleaned.includes("number")) {
          return "string /* \u26A0 normalized from (string | number) */";
        }
        return unique.join(" | ");
      }
      return types.join(" | ");
    }
    default:
      return "unknown";
  }
}
function renderObjectSchema(node, registry, currentName, safeMode) {
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
  return `z.object({
${indent(lines.join(",\n"))}
}).strict()`;
}
function renderSchemaNode(node, registry, currentName, safeMode) {
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
        safeMode
      )})`;
    case "object": {
      const name = node.__name;
      return name ? `${name}Schema` : "z.unknown()";
    }
    case "union": {
      const options = node.options.filter((opt) => !(opt.kind === "primitive" && opt.type === "null")).map((opt) => renderSchemaNode(opt, registry, currentName, safeMode));
      if (safeMode) {
        return `${options[0]} // \u26A0 normalized`;
      }
      return `z.union([${options.join(", ")}])`;
    }
    default:
      return "z.unknown()";
  }
}
function needsParensForArrayItem(node) {
  return node.kind === "union";
}
function getNodeSignature(node) {
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
function getObjectSignature(node) {
  const entries = Object.entries(node.fields).map(([key, field]) => {
    return `${key}:${getNodeSignature(field.node)}:${field.optional ? "opt" : "req"}:${field.nullable ? "null" : "non-null"}`;
  });
  return `object:{${entries.sort().join(",")}}`;
}
function ensureUniqueName(baseName, registry) {
  const usedNames = new Set(
    Array.from(registry.values()).map((entry) => entry.name)
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
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function pascalCase(value) {
  return value.replace(/[_\-\s]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").trim().split(/\s+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
}
function singularize(value) {
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
function indent(value, spaces = 2) {
  const prefix = " ".repeat(spaces);
  return value.split("\n").map((line) => `${prefix}${line}`).join("\n");
}
function joinBlocks(blocks) {
  return blocks.flatMap(
    (block, index) => index === 0 ? [block] : ["", block]
  );
}

// src/tests/testRunner.ts
function runTest({ name, input, expectedIncludes }) {
  try {
    const output = jsonToTypesAndZod(input)?.trim();
    if (!output) {
      console.error(`\u274C ${name} \u2192 No output`);
      return;
    }
    if (expectedIncludes) {
      for (const expectedPart of expectedIncludes) {
        if (!output.includes(expectedPart.trim())) {
          console.error(`\u274C ${name} \u2192 Missing part`);
          console.log("----- MISSING -----");
          console.log(expectedPart);
          console.log("----- GOT -----");
          console.log(output);
          return;
        }
      }
    }
    console.log(`\u2705 ${name}`);
  } catch (err) {
    console.error(`\u{1F4A5} ${name}`, err);
  }
}

// src/tests/cases/primitives.ts
runTest({
  name: "string primitive",
  input: { name: "alex" },
  expectedIncludes: [
    "type RootObject = {",
    "name: string;",
    "z.object({",
    "name: z.string()"
  ]
});
runTest({
  name: "number primitive",
  input: { age: 30 },
  expectedIncludes: [
    "type RootObject = {",
    "age: number;",
    "z.object({",
    "age: z.number()"
  ]
});
runTest({
  name: "boolean primitive",
  input: { isActive: true },
  expectedIncludes: [
    "type RootObject = {",
    "isActive: boolean;",
    "z.object({",
    "isActive: z.boolean()"
  ]
});

// src/tests/cases/objects.ts
runTest({
  name: "nested object",
  input: {
    user: {
      name: "alex",
      age: 30
    }
  },
  expectedIncludes: [
    "type User = {",
    "name: string;",
    "age: number;",
    "type RootObject = {",
    "user: User;",
    "UserSchema = z.object",
    "name: z.string()",
    "age: z.number()"
  ]
});

// src/tests/cases/edgeCases.ts
runTest({
  name: "inconsistent object \u2192 optional fields",
  input: [{ name: "alex" }, { age: 30 }],
  expectedIncludes: ["name?: string", "age?: number"]
});
runTest({
  name: "numeric string \u2192 string type",
  input: { id: "123" },
  expectedIncludes: ["id: string", "z.string()"]
});
runTest({
  name: "null value \u2192 optional or nullable",
  input: { city: null },
  expectedIncludes: ["city"]
});
runTest({
  name: "mixed types \u2192 union",
  input: [{ id: 1 }, { id: "1" }],
  expectedIncludes: ["id"]
});

// src/core/utils/jsonShapeProblems.ts
function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function getType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}
function isNumericString(value) {
  return typeof value === "string" && /^[0-9]+$/.test(value);
}
function detectShapeProblems(data) {
  const problems = [];
  function walk(value, path) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        problems.push({
          path,
          message: "empty array, item type unknown",
          severity: "warning"
        });
        return;
      }
      const types = new Set(value.map(getType));
      if (types.size > 1) {
        problems.push({
          path,
          message: `mixed types (${Array.from(types).join(" | ")})`,
          severity: value.some(isObject) ? "critical" : "warning"
        });
      }
      if (value.every(isObject)) {
        const shapes = new Set(
          value.map((obj) => Object.keys(obj).sort().join("|"))
        );
        if (shapes.size > 1) {
          problems.push({
            path,
            message: "inconsistent object shape",
            severity: "critical"
          });
        }
        const keysMap = /* @__PURE__ */ new Map();
        value.forEach((item) => {
          Object.keys(item).forEach((key) => {
            keysMap.set(key, (keysMap.get(key) || 0) + 1);
          });
        });
        const total = value.length;
        keysMap.forEach((count, key) => {
          if (count !== total) {
            problems.push({
              path,
              message: `${key} appears in ${count}/${total} items`,
              severity: "warning"
            });
          }
        });
        value.forEach((item, i) => walk(item, `${path}[${i}]`));
      }
      return;
    }
    if (isObject(value)) {
      Object.entries(value).forEach(([key, val]) => {
        const currentPath = path ? `${path}.${key}` : key;
        if (val === null) {
          problems.push({
            path: currentPath,
            message: "null value detected",
            severity: "warning"
          });
        }
        if (isNumericString(val)) {
          problems.push({
            path: currentPath,
            message: "numeric string detected",
            severity: "warning"
          });
        }
        walk(val, currentPath);
      });
      return;
    }
  }
  walk(data, "root");
  return problems.map((p) => {
    const icon = p.severity === "critical" ? "\u274C" : "\u26A0";
    return `${icon} ${p.path}: ${p.message}`;
  });
}

// src/tests/cases/problems.ts
function runProblemTest(name, input, expectedCount) {
  const problems = detectShapeProblems(input);
  if (problems.length !== expectedCount) {
    console.error(`\u274C ${name} \u2192 Wrong problem count`);
    console.log("Expected:", expectedCount);
    console.log("Got:", problems.length);
    console.log(problems);
    return;
  }
  console.log(`\u2705 ${name}`);
}
runProblemTest(
  "detect inconsistent object shape",
  [{ name: "alex" }, { age: 30 }],
  3
  // adjust based on your implementation
);
runProblemTest(
  "detect null values",
  {
    user: {
      city: null,
      zip: null
    }
  },
  2
);
runProblemTest(
  "detect numeric string",
  {
    id: "123"
  },
  1
);
runProblemTest(
  "clean object \u2192 no problems",
  {
    name: "alex",
    age: 30
  },
  0
);

// src/core/fixes/buildFixPreview.ts
function isObject2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function mergeObjectKeys(arr) {
  const allKeys = /* @__PURE__ */ new Set();
  arr.forEach((obj) => {
    Object.keys(obj).forEach((key) => allKeys.add(key));
  });
  return Array.from(allKeys);
}
function fixArray(arr) {
  const allObjects = arr.every(isObject2);
  if (!allObjects) {
    return { fixed: arr, hasChanges: false };
  }
  const objects = arr;
  const normalized = objects.map((obj) => {
    const fix = buildFixPreview(obj);
    return fix.fixed;
  });
  const keys = mergeObjectKeys(normalized);
  let changed = false;
  const fixed = normalized.map((obj, index) => {
    const newObj = {};
    keys.forEach((key) => {
      const value = obj[key];
      if (value === void 0) {
        newObj[key] = null;
        changed = true;
      } else if (Array.isArray(value)) {
        const fix = fixArray(value);
        newObj[key] = fix.fixed;
        if (fix.hasChanges) changed = true;
      } else if (isObject2(value)) {
        const valuesAtKey = normalized.map((item) => item[key]);
        const allObjects2 = valuesAtKey.every(isObject2);
        if (allObjects2) {
          const nestedFix = fixArray(valuesAtKey);
          const fixedArray = nestedFix.fixed;
          newObj[key] = fixedArray[index];
          if (nestedFix.hasChanges) changed = true;
        } else {
          const fix = buildFixPreview(value);
          newObj[key] = fix.fixed;
          if (fix.hasChanges) changed = true;
        }
      } else {
        newObj[key] = value;
      }
    });
    return newObj;
  });
  return {
    fixed,
    hasChanges: changed
  };
}
function buildFixPreview(input) {
  if (Array.isArray(input)) {
    return fixArray(input);
  }
  if (isObject2(input)) {
    let changed = false;
    const result = {};
    Object.entries(input).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const fix = fixArray(value);
        result[key] = fix.fixed;
        if (fix.hasChanges) changed = true;
      } else if (isObject2(value)) {
        const fix = buildFixPreview(value);
        result[key] = fix.fixed;
        if (fix.hasChanges) changed = true;
      } else {
        result[key] = value;
      }
    });
    return {
      fixed: result,
      hasChanges: changed
    };
  }
  return {
    fixed: input,
    hasChanges: false
  };
}

// src/tests/cases/fix.ts
function runFixTest(name, input, validate) {
  try {
    const { fixed } = buildFixPreview(input);
    if (!validate(fixed)) {
      console.error(`\u274C ${name} \u2192 invalid fix result`);
      console.log("Fixed:", fixed);
      return;
    }
    console.log(`\u2705 ${name}`);
  } catch (e) {
    console.error(`\u{1F4A5} ${name}`, e);
  }
}
runFixTest(
  "fix inconsistent object \u2192 merged shape",
  [{ name: "alex" }, { age: 30 }],
  (fixed) => {
    return Array.isArray(fixed) && fixed.every((item) => "name" in item && "age" in item);
  }
);
runFixTest(
  "preserve null values",
  {
    city: null
  },
  (fixed) => fixed.city === null
);
runFixTest(
  "numeric string should NOT auto convert",
  {
    id: "123"
  },
  (fixed) => typeof fixed.id === "string"
);
runFixTest(
  "deep object fix",
  [
    {
      user: { name: "alex" }
    },
    {
      user: { age: 30 }
    }
  ],
  (fixed) => {
    return fixed.every(
      (item) => item.user && "name" in item.user && "age" in item.user
    );
  }
);
