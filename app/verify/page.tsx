"use client";

import { useState, Suspense } from "react";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyOtpAction } from "@/app/actions";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function VerifyForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [state, formAction, isPending] = useActionState(
    verifyOtpAction,
    null
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Check your email</CardTitle>
        <CardDescription>
          We sent a verification code to{" "}
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {email}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-6">
          {/* Hidden inputs to pass data to Server Action */}
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="code" value={code} />

          <div className="flex flex-col items-center justify-center space-y-3">
            <Label htmlFor="otp-input" className="self-start">
              6-Digit Passcode
            </Label>

            <InputOTP
              id="otp-input"
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
              disabled={isPending}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>

              <InputOTPSeparator />

              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Error Message */}
          {state?.error && (
            <p className="text-center text-sm font-medium text-red-600 dark:text-red-400">
              {state.error}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || code.length < 6}
          >
            {isPending ? "Verifying..." : "Verify & Sign In"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Enter the 6-digit code sent to your email.
        </p>
      </CardFooter>
    </Card>
  );
}

export default function VerifyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      <Suspense fallback={<p className="text-sm text-slate-500">Loading...</p>}>
        <VerifyForm />
      </Suspense>
    </main>
  );
}