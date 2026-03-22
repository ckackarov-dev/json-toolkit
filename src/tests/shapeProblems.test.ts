import { detectShapeProblems } from "../core/utils/jsonShapeProblems";

function test(name: string, data: unknown) {
  console.log(`\n==================== ${name} ====================\n`);

  const result = detectShapeProblems(data);

  if (result.length === 0) {
    console.log("✅ No problems");
  } else {
    result.forEach((r) => console.log(r));
  }
}

// 🧪 TEST 1 — inconsistent object
test("Inconsistent object", {
  users: [{ name: "alex", age: 25 }, { name: "john" }],
});

// 🧪 TEST 2 — mixed types
test("Mixed types", {
  price: ["10", 20],
});

// 🧪 TEST 3 — empty array
test("Empty array", {
  tags: [],
});

// 🧪 TEST 4 — null
test("Null field", {
  status: null,
});

// 🧪 TEST 5 — nested
test("Nested structure", {
  data: {
    items: [{ id: 1 }, { id: 2, name: "x" }],
  },
});

test("Real world combo", {
  users: [{ name: "alex", age: 25 }, { name: "john" }],
  price: ["10", 20],
  tags: [],
  status: null,
});
