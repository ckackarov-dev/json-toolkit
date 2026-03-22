import { detectShapeProblems } from "../../core/utils/jsonShapeProblems";

function runProblemTest(name: string, input: any, expectedCount: number) {
  const problems = detectShapeProblems(input);

  if (problems.length !== expectedCount) {
    console.error(`❌ ${name} → Wrong problem count`);
    console.log("Expected:", expectedCount);
    console.log("Got:", problems.length);
    console.log(problems);
    return;
  }

  console.log(`✅ ${name}`);
}

runProblemTest(
  "detect inconsistent object shape",
  [{ name: "alex" }, { age: 30 }],
  3, // adjust based on your implementation
);

runProblemTest(
  "detect null values",
  {
    user: {
      city: null,
      zip: null,
    },
  },
  2,
);

runProblemTest(
  "detect numeric string",
  {
    id: "123",
  },
  1,
);

runProblemTest(
  "clean object → no problems",
  {
    name: "alex",
    age: 30,
  },
  0,
);
