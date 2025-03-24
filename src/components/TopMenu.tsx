"use client"
import { useSession } from "next-auth/react";  
import TopMenuItem from "./TopMenuItem";
import { Link } from "@mui/material";

export default function TopMenu() {
  const { data: session, status } = useSession();  


  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-end p-0 bg-gray-800 text-white z-[20]">
      <div className="flex flex-row absolute left-0">
        {
          session ? (
            <Link href="/auth/signout">
              <div className="flex items-center h-full px-2 py-5 text-cyan-600 text-lg">
                Sign-Out
              </div>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <div className="flex items-center h-full px-2 py-5 text-cyan-600 text-lg">
                Sign-In
              </div>
            </Link>
          )
        }
        {
          session?.user.role === "admin" ? (
            <TopMenuItem title="All Booking" pageRef="/mybooking" />
          ) : (
            <TopMenuItem title="My Booking" pageRef="/mybooking" />
          )
        }
      </div>

      <TopMenuItem title="Shops" pageRef="/shops" />
      <TopMenuItem title="Booking" pageRef="/booking" />
      
      {
        session?.user.role === "admin" ? (
          <TopMenuItem title="All User" pageRef="/users" />
        ) : null
      }
      <TopMenuItem title="Home" pageRef="/" />
    </div>
  );
}
