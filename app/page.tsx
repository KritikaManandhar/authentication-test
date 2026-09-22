import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LogIn,
  LayoutDashboard,
  KeyRound,
  ShieldCheck,
  ExternalLink,
  ArrowRight
} from "lucide-react";

export default async function HomePage() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
      <div className="w-full max-w-3xl space-y-8">

        {/* Hero Section Header */}
        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-lg">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Next.js Auth & Resend Test Lab
          </h1>
          <p className="mx-auto max-w-xl text-slate-600 dark:text-slate-400">
            Testing hub for Authentication, Zod Schema Validation, Middleware Authorization, and Resend transactional emails.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">

          <Card className="flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 dark:hover:border-slate-700">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <LogIn className="h-4 w-4" />
              </div>
              <CardTitle className="text-lg">Login Route</CardTitle>
              <CardDescription className="text-xs">
                Enter email to trigger Resend OTP delivery.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Link href="/login">
                <Button className="w-full justify-between" variant="outline">
                  <span>Go to /login</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Verification Card */}
          <Card className="flex flex-col justify-between transition-all duration-300 hover:rotate-3 dark:hover:border-slate-700">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                <KeyRound className="h-4 w-4" />
              </div>
              <CardTitle className="text-lg">Verify Route</CardTitle>
              <CardDescription className="text-xs">
                Passcode verification screen with Zod validation.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Link href="/verify?email=test@example.com">
                <Button className="w-full justify-between" variant="outline">
                  <span>Go to /verify</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Dashboard Card */}
          <Card className="flex flex-col justify-between transition-all hover:border-slate-400 active:scale-95 dark:hover:border-slate-700">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <CardTitle className="text-lg">Dashboard Route</CardTitle>
              <CardDescription className="text-xs">
                Protected page. Blocked if not logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Link href="/dashboard">
                <Button className="w-full justify-between">
                  <span>Go to /dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}