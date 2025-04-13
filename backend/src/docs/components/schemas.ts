import { userSchema, boardSchema, listSchema, cardSchema } from "../schemas";

export const schemas = {
  ...userSchema,
  ...boardSchema,
  ...listSchema,
  ...cardSchema,
};
