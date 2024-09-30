import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .min(1, "Password needs to be at lest 1 character"),
});

export const forgetPasswordValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
});

export const resetPasswordValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  newPassword: z
    .string()
    .trim()
    .min(1, "Password must be at least 1 characters"),
});

export default loginValidationSchema;
