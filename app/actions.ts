"use server";

import { Resend } from "resend";
import { loginSchema, verifyOtpSchema } from "../lib/schemas";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpAction(prevState: any, formData: FormData) {
  const rawEmail = formData.get("email");
  
  // 1. Zod Server Validation
  const validated = loginSchema.safeParse({ email: rawEmail });
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors.email?.[0] };
  }

  const { email } = validated.data;
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

  // 2. Save OTP temporarily to session (Expires in 10 min)
  const session = await getSession();
  session.otp = {
    email,
    code,
    expiresAt: Date.now() + 10 * 60 * 1000,
  };
  await session.save();

  // 3. Send Email via Resend
  try {
    await resend.emails.send({
      from: "Auth Demo <onboarding@resend.dev>", // Default Resend test domain
      to: email,
      subject: "Your Login Verification Code",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Security Verification Code</h2>
          <p>Your one-time pass code is: <strong style="font-size: 24px;">${code}</strong></p>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    });
  } catch (err) {
    return { error: "Failed to send verification email via Resend." };
  }

  redirect(`/verify?email=${encodeURIComponent(email)}`);
}

export async function verifyOtpAction(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const code = formData.get("code");

  // 1. Zod Server Validation
  const validated = verifyOtpSchema.safeParse({ email, code });
  if (!validated.success) {
    return { error: "Invalid input values provided." };
  }

  const session = await getSession();

  // 2. Validate OTP
  if (
    !session.otp ||
    session.otp.email !== validated.data.email ||
    session.otp.code !== validated.data.code
  ) {
    return { error: "Invalid or expired verification code." };
  }

  if (Date.now() > session.otp.expiresAt) {
    return { error: "Code has expired. Request a new one." };
  }

  // 3. Establish Authenticated Session
  session.user = { email: validated.data.email, isLoggedIn: true };
  delete session.otp; // Clear single-use OTP
  await session.save();

  redirect("/dashboard");
}

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
  redirect("/login");
}