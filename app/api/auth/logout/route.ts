import AuthStorage from "@/auth/AuthStorage";
import { SESSION_COOKIE_NAME } from "@/auth/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const sessionIdCookieValue = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionIdCookieValue) {
    return NextResponse.json({}, {
      status: 400,
    });
  }
  const response = NextResponse.json({}, {
    status: 200,
  });
  await AuthStorage.handleClearSession(sessionIdCookieValue);
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
