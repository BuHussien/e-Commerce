import { z } from "zod";

const signInScheema = z.object({
  email: z.string().trim().min(1, { message: "email is required" }).email({ message: "enter a valid email address" }),
  password: z.string().min(6, { message: "must be at least 6 characters" }),
});
type signInType = z.infer<typeof signInScheema>;
export { signInScheema, type signInType };
  