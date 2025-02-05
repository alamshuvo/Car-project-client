import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string({ required_error: "Email is required!" }).min(1, { message: "Please enter a valid email address!" }),
  password: z.string({ required_error: "Password is required!" }).min(1, { message: "Please enter a valid password!" })
});

export const registerValidationSchema = z.object({
  name: z.string({ required_error: "Name is required!" }).min(1, { message: "Please enter a valid name!" }),
  email: z.string({ required_error: "Email is required!" }).min(1, { message: "Please enter a valid email address!" }),
  password: z.string({ required_error: "Password is required!" }).min(8)
});
