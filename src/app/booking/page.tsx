'use client'
import dayjs from "dayjs";
import { useSession } from "next-auth/react"
import { AppDispatch } from "@/redux/store"
import { useDispatch  } from "react-redux";
import { addReservation } from "@/redux/features/cartSlice"
import { useRouter, useSearchParams } from 'next/navigation';
import createReservation from "@/libs/Reservations/createReservation"
import BookingForm from "@/components/BookingForm"
import { useState } from "react";

const BookingPage = () => {

  const [error, setError] = useState("");

  const { data:session } = useSession();
  const token = session?.user.token;

  const router = useRouter();

  const searchParams = useSearchParams();
  const defaultShopId = searchParams.get("shopId") || null;

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (date:string,selectedShopId:string) => {

    if (dayjs(date).isBefore(dayjs(), 'day')) {
      setError("Cannot select a past date.");
      return;
    }

    const body = {
      date: dayjs(date).format("YYYY/MM/DD")
    }
    if(selectedShopId){
      const response = await createReservation(selectedShopId,token,body); // database
      if(response.success){
        dispatch(addReservation(response.data)) // redux
        router.push('/mybooking')
      }
      else{
        setError("Cannot create anymore Reservation");
      }
    }
  }

  return (
    <div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <BookingForm onSubmit={handleSubmit} defaultShopId={defaultShopId}/>
    </div>
  )
}

export default BookingPage