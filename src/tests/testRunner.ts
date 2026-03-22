import { jsonToTypesAndZod } from "../core/jsonToTypesAndZod";

type TestCase = {
  name: string;
  input: any;
  expectedIncludes?: string[];
};

function normalize(str: string) {
  return str.replace(/\s+/g, " ").replace(/;\s*/g, ";").trim();
}

export function runTest({ name, input, expectedIncludes }: TestCase) {
  try {
    const output = jsonToTypesAndZod(input)?.trim();

    if (!output) {
      console.error(`❌ ${name} → No output`);
      return;
    }

    if (expectedIncludes) {
      for (const expectedPart of expectedIncludes) {
        if (!output.includes(expectedPart.trim())) {
          console.error(`❌ ${name} → Missing part`);
          console.log("----- MISSING -----");
          console.log(expectedPart);
          console.log("----- GOT -----");
          console.log(output);
          return;
        }
      }
    }

    console.log(`✅ ${name}`);
  } catch (err) {
    console.error(`💥 ${name}`, err);
  }
}
// ============================
// EDGE CASES (REAL WORLD)
// ============================

// runTest("EDGE1_optional_nullable", {
//   users: [
//     { name: "Alex", age: 25 },
//     { name: "John" },
//     { name: "Bob", age: null },
//   ],
// });

// runTest("EDGE2_nested_arrays", {
//   users: [
//     { name: "Alex", tags: [["a"], ["b"]] },
//     { name: "John", tags: null },
//   ],
// });

// runTest("EDGE3_primitives", {
//   values: [1, "hello", true, null],
// });

// runTest("EDGE4_deep_merge", {
//   users: [{ profile: { name: "Alex" } }, { profile: { age: 30 } }],
// });

// runTest("EDGE5_optional_only", {
//   users: [{ age: 10 }, {}],
// });

// runTest("EDGE6_nullable_only", {
//   users: [{ age: 10 }, { age: null }],
// });
