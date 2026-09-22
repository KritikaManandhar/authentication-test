import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  // Pass request & response directly
  const session = await getIronSession<SessionData>(
    request,
    res,
    sessionOptions
  );

  const { pathname } = request.nextUrl;
  //const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard") && !session.user?.isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    (pathname === "/login" || pathname === "/verify") &&
    session.user?.isLoggedIn
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/verify"],
};