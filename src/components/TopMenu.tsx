"use client"
import { useSession } from "next-auth/react";  
import TopMenuItem from "./TopMenuItem";
import { Link } from "@mui/material";

export default function TopMenu() {
  const { data: session, status } = useSession();  

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-16 bg-gray-800 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-6 py-2 bg-gray-900 text-white shadow-md z-[20] border-b border-gray-700">
      <div className="flex items-center space-x-6">
        {session ? (
          <Link href="/auth/signout" className="text-cyan-400 hover:text-cyan-300 transition font-semibold">
            Sign-Out
          </Link>
        ) : (
          <Link href="/api/auth/signin" className="text-cyan-400 hover:text-cyan-300 transition font-semibold">
            Sign-In
          </Link>
        )}
        {session?.user.role === "admin" ? (
          <TopMenuItem title="All Booking" pageRef="/mybooking" />
        ) : (
          <TopMenuItem title="My Booking" pageRef="/mybooking" />
        )}
      </div>
      
      <div className="flex items-center space-x-6">
        <TopMenuItem title="Shops" pageRef="/shops" />
        <TopMenuItem title="Booking" pageRef="/booking" />
        {session?.user.role === "admin" && (
          <TopMenuItem title="All User" pageRef="/users" />
        )}
        <TopMenuItem title="Home" pageRef="/" />
      </div>
    </div>
  );
}
