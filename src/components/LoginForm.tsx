"use client";

import React, { useState } from "react";
import { object, string } from "yup";
import type { ObjectSchema } from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import { yupResolver } from "@hookform/resolvers/yup";

interface ILoginForm {
  email: string;
  otp?: string;
}

const validation: ObjectSchema<ILoginForm> = object({
  email: string().email().required(),
  otp: string(),
});

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ILoginForm>({
    resolver: yupResolver(validation),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);

  const handleGenerateOTP = async ({ email }: ILoginForm): Promise<void> => {
    const response = await fetch("/api/auth/generate-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    if (response.ok) {
      setIsOTPSent(true);
    }
  }
  const handleVerifyOTP = async ({ email, otp }: ILoginForm): Promise<void> => {
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp: otp!,
      }),
    });
    if (response.ok) {
      router.refresh();
    }
  }

  const handleLogin = async (values: ILoginForm) => {
    setIsLoading(true);
    if (isOTPSent) {
      await handleVerifyOTP(values);
    } else {
      await handleGenerateOTP(values);
    }
    setIsLoading(false);
  };

  return (
    <>
      <h1>
        Login
      </h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          type="email"
          placeholder="email@example.com"
          disabled={isOTPSent}
          {...register("email")}
        />
        {isOTPSent && (
          <input
            type="text"
            placeholder="1234"
            {...register("otp")}
          />
        )}
        <button type="submit" className="login-button" disabled={isLoading}>
          {((() => {
            if (isLoading) {
              return "Loading...";
            }
            if (isOTPSent) {
              return "Verify OTP";
            }
            return "Generate OTP";
          }))()}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
