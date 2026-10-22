import { z } from "zod";

const signUpScheema = z
  .object({
    firstname: z.string().trim().min(3, { message: "at least 3 characters" }),
    lastname: z.string().trim().min(3, { message: "at least 3 characters" }),
    email: z
      .string()
      .trim()
      .min(1, { message: "email is required" })
      .email({ message: "enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "must be at least 6 characters" })
      .regex(/[.*!@#$%^&*()_+\-{}[\]\\:;"'<>,.?/|~`]/, {
        message: "should contain at least 1 special character",
      }),
    confirmPassword: z.string().min(1, { message: "confirm your password" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type signUpType = z.infer<typeof signUpScheema>;
export { signUpScheema, type signUpType };
