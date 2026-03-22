import { runTest } from "../testRunner";

runTest({
  name: "string primitive",
  input: { name: "alex" },
  expectedIncludes: [
    "type RootObject = {",
    "name: string;",
    "z.object({",
    "name: z.string()",
  ],
});

runTest({
  name: "number primitive",
  input: { age: 30 },
  expectedIncludes: [
    "type RootObject = {",
    "age: number;",
    "z.object({",
    "age: z.number()",
  ],
});

runTest({
  name: "boolean primitive",
  input: { isActive: true },
  expectedIncludes: [
    "type RootObject = {",
    "isActive: boolean;",
    "z.object({",
    "isActive: z.boolean()",
  ],
});
