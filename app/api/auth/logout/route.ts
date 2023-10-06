import { SESSION_COOKIE_NAME } from "@/auth/constants";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({}, {
    status: 200,
  })
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
