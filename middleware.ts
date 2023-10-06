import { NextRequest, NextResponse } from "next/server"
import { LOGIN_REDIRECT_PATH, SESSION_COOKIE_NAME } from "@/auth/constants";

export async function middleware(request: NextRequest) {
  const sessionIdCookieValue = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionIdCookieValue) {
    return NextResponse.redirect(new URL(LOGIN_REDIRECT_PATH, request.url))
  }
};

export const config = { matcher: ["/admin"] }
