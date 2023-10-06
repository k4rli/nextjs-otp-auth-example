import type { NextRequest, NextResponse } from "next/server";
import AuthStorage from "@/auth/AuthStorage";
import OTPMailer from "@/auth/OTPMailer";

interface IGenerateOTPRequest {
  email: string;
}

export async function POST(req: NextRequest, _: NextResponse) {
  const { email } = (await req.json()) as IGenerateOTPRequest;

  await OTPMailer.sendOTP(
    email,
    await AuthStorage.generateAndSetOTPForEmail(email),
  );

  return new Response("", { status: 200 });
}
