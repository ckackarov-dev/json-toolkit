import { extractTypes, extractZod } from "./extractors";
import { jsonToTypesAndZod } from "./jsonToTypesAndZod";

export function jsonToAll(json: unknown) {
  const full = jsonToTypesAndZod(json);

  return {
    types: extractTypes(full),
    zod: extractZod(full),
  };
}
