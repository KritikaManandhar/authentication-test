import { getSession } from "@/lib/session";
import { logoutAction } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, UserCheck, Lock } from "lucide-react";

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      <Card className="w-full max-w-lg border-slate-200 shadow-xl dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Protected Dashboard</CardTitle>
              <CardDescription>Access Granted via Middleware</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-lg bg-slate-100 p-4 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Authenticated as:</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{session.user?.email}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" />
            <span>This route is protected by session middleware.</span>
          </div>

          <form action={logoutAction}>
            <Button variant="destructive" type="submit" className="w-full gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}