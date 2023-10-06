import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME } from "@/auth/constants";
import LoginForm from "@/components/LoginForm";
import AuthStorage from "@/auth/AuthStorage";

const LoginPage = async () => {
  const sessionIdCookieValue = cookies().get(SESSION_COOKIE_NAME)?.value;

  if (sessionIdCookieValue && await AuthStorage.isValidSessionId(sessionIdCookieValue)) {
    redirect("/admin");
  }

  return (
    <main className="main">
      <div className="login-container">
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage;
