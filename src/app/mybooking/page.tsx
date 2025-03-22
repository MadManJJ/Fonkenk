import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import getReservations from "@/libs/Reservations/getReservations";
import { Suspense } from "react";
import ReservationCart from "@/components/ReservationCart";

const page = () => {

  return (
    <main className="text-center p-5">
      <h1 className="text-xl font-medium">Your Booking</h1>
        <ReservationCart/>
    </main>
  )
}

export default page