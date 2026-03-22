import { buildFixPreview } from "../../core/fixes/buildFixPreview";

function runFixTest(
  name: string,
  input: any,
  validate: (fixed: any) => boolean,
) {
  try {
    const { fixed } = buildFixPreview(input);

    if (!validate(fixed)) {
      console.error(`❌ ${name} → invalid fix result`);
      console.log("Fixed:", fixed);
      return;
    }

    console.log(`✅ ${name}`);
  } catch (e) {
    console.error(`💥 ${name}`, e);
  }
}

runFixTest(
  "fix inconsistent object → merged shape",
  [{ name: "alex" }, { age: 30 }],
  (fixed) => {
    return (
      Array.isArray(fixed) &&
      fixed.every((item) => "name" in item && "age" in item)
    );
  },
);

runFixTest(
  "preserve null values",
  {
    city: null,
  },
  (fixed) => fixed.city === null,
);

runFixTest(
  "numeric string should NOT auto convert",
  {
    id: "123",
  },
  (fixed) => typeof fixed.id === "string",
);

runFixTest(
  "deep object fix",
  [
    {
      user: { name: "alex" },
    },
    {
      user: { age: 30 },
    },
  ],
  (fixed) => {
    return fixed.every(
      (item: any) => item.user && "name" in item.user && "age" in item.user,
    );
  },
);
