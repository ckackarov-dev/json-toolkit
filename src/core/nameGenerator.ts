import { z } from "zod";

type User = {
  name: string;
};

type User1 = {
  age: number;
};

type RootObject = {
  users: (User | User1)[];
};

const UserSchema = z.object({
  name: z.string(),
});

const User1Schema = z.object({
  age: z.number(),
});

const RootObjectSchema = z.object({
  users: z.array(z.union([UserSchema, User1Schema])),
});
