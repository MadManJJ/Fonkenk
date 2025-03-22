"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button 
      onClick={() => signOut()} 
      className="bg-red-500 text-white p-2 rounded"
    >
      Sign Out
    </button>
  );
}
