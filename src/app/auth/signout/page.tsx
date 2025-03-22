"use client"
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function SignOutButton() {

  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
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
