"use client";

import { useState, useActionState } from "react";
import { sendOtpAction } from "@/app/actions";
import { SwapForm } from "@/components/swap-form";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(
        sendOtpAction,
        null
    );

    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <div className="w-full max-w-md flex flex-col items-center">

                <form action={formAction} className="w-full flex justify-center">
                    <SwapForm
                        isSignIn={isSignIn}
                        onModeChange={setIsSignIn}
                    />
                </form>

                {state?.error && (
                    <p className="mt-4 text-center text-sm font-medium text-red-600 dark:text-red-400">
                        {state.error}
                    </p>
                )}

                {isPending && (
                    <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400 animate-pulse">
                        Sending verification code...
                    </p>
                )}

            </div>
        </main>
    );
}