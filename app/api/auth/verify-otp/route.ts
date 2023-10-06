import { NextRequest, NextResponse } from "next/server";
import AuthStorage from "@/auth/AuthStorage";
import { SESSIONID_EXPIRATION_SECONDS, SESSION_COOKIE_NAME } from "@/auth/constants";

interface IVerifyOTPRequest {
  email: string;
  pin: string;
}

export async function POST(req: NextRequest) {
  const { email, pin } = (await req.json()) as IVerifyOTPRequest;

  if (await AuthStorage.isValidOTP(email, pin)) {
    await AuthStorage.removeOTP(email);

    const sessionId = await AuthStorage.createSessionID(email);
    const response = NextResponse.json({}, {
      status: 200,
    });
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionId,
      httpOnly: true,
      maxAge: SESSIONID_EXPIRATION_SECONDS,
    });
    return response;
  }

  return new Response("", { status: 403 });
}
