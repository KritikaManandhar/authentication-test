import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address format" }),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  code: z
    .string()
    .length(6, { message: "Verification code must be exactly 6 digits" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;