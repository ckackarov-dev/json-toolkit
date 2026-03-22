export function extractTypes(input: string): string {
  const parts = input.split('import { z } from "zod";');
  if (parts.length < 2) return input;

  const body = parts[1];

  const typePart = body
    .split("const")
    .map((block) => block.trim())
    .filter((block) => block.startsWith("type"))
    .join("\n\n");

  return `import { z } from "zod";\n\n${typePart}`.trim();
}

export function extractZod(input: string): string {
  const parts = input.split('import { z } from "zod";');
  if (parts.length < 2) return input;

  const body = parts[1];

  const schemaPart = body
    .split("\n")
    .filter((line) => line.includes("Schema"))
    .join("\n");

  return `import { z } from "zod";\n\n${schemaPart}`.trim();
}
