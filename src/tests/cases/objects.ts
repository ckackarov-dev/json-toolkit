import { runTest } from "../testRunner";

runTest({
  name: "nested object",
  input: {
    user: {
      name: "alex",
      age: 30,
    },
  },
  expectedIncludes: [
    "type User = {",
    "name: string;",
    "age: number;",
    "type RootObject = {",
    "user: User;",
    "UserSchema = z.object",
    "name: z.string()",
    "age: z.number()",
  ],
});
