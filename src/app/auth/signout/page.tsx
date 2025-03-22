"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {

  const handleLogout = () => {
    signOut();
    window.location.href = "/";
  }

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-500 text-white p-2 rounded"
    >
      Sign Out
    </button>
  );
}
