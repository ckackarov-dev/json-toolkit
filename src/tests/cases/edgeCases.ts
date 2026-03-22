import { runTest } from "../testRunner";

runTest({
  name: "inconsistent object → optional fields",
  input: [{ name: "alex" }, { age: 30 }],
  expectedIncludes: ["name?: string", "age?: number"],
});
runTest({
  name: "numeric string → string type",
  input: { id: "123" },
  expectedIncludes: ["id: string", "z.string()"],
});

runTest({
  name: "null value → optional or nullable",
  input: { city: null },
  expectedIncludes: ["city"],
});

runTest({
  name: "mixed types → union",
  input: [{ id: 1 }, { id: "1" }],
  expectedIncludes: ["id"],
});
