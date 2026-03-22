type GenerateCodeOptions = {
  includeImport?: boolean;
  includeZod?: boolean;
};

export function generateCode(
  types: string,
  zod: string,
  options: GenerateCodeOptions = {},
) {
  const { includeImport = true, includeZod = true } = options;

  return `
${includeImport ? `import { z } from "zod";\n` : ""}
${types}

${includeZod ? zod : ""}
`.trim();
}
