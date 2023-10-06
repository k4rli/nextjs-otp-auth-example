import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/auth/constants";
import LogoutButton from "@/components/LogoutButton";

const Home = () => {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME);

  return (
    <main className="main">
      <h1>Hello!</h1>
      {sessionCookie
        ? (<p>{sessionCookie.name}:${sessionCookie.value}</p>)
        : "Not authenticated"
      }
      <Link href="/login">Login page</Link>
      <Link href="/admin">Admin page</Link>
      {sessionCookie && <LogoutButton />}
    </main>
  )
}

export default Home;
