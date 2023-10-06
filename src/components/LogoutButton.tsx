"use client";

import React from "react";
import { useRouter } from "next/navigation";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  )
}

export default LogoutButton;
