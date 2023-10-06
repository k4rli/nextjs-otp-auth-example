"use client";

import React, { useState } from "react";
import { object, string } from "yup";
import type { ObjectSchema } from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import { yupResolver } from "@hookform/resolvers/yup";

interface ILoginForm {
  email: string;
  pin?: string;
}

const validation: ObjectSchema<ILoginForm> = object({
  email: string().email().required(),
  pin: string(),
});

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ILoginForm>({
    resolver: yupResolver(validation),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPinSent, setIsPinSent] = useState(false);


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
      setIsPinSent(true);
    }
  }
  const handleVerifyOTP = async ({ email, pin }: ILoginForm): Promise<void> => {
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        pin: pin!,
      }),
    });
    if (response.ok) {
      router.refresh();
    }
  }

  const handleLogin = async (values: ILoginForm) => {
    setIsLoading(true);
    if (isPinSent) {
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
          disabled={isPinSent}
          {...register("email")}
        />
        {isPinSent && (
          <input
            type="text"
            placeholder="1234"
            {...register("pin")}
          />
        )}
        <button type="submit" className="login-button" disabled={isLoading}>
          {((() => {
            if (isLoading) {
              return "Loading...";
            }
            if (isPinSent) {
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
