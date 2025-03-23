'use client'
import dayjs from "dayjs";
import { useSession } from "next-auth/react"
import { AppDispatch } from "@/redux/store"
import { useDispatch  } from "react-redux";
import { addReservation } from "@/redux/features/cartSlice"
import { useRouter } from 'next/navigation';
import createReservation from "@/libs/Reservations/createReservation"
import BookingForm from "@/components/BookingForm"

const BookingPage = () => {

  const { data:session } = useSession();
  const token = session?.user.token;

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (date:string,selectedShopId:string) => {
    const body = {
      date: dayjs(date).format("YYYY/MM/DD")
    }
    if(selectedShopId){
      try {
        const response = await createReservation(selectedShopId,token,body); // database
        dispatch(addReservation(response.data)) // redux
        router.push('/mybooking')
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <h1>Book A Reservation</h1>
      <BookingForm onSubmit={handleSubmit}/>
    </div>
  )
}

export default BookingPage