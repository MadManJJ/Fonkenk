'use client'
import { useEffect } from "react";
import { ReservationItem } from "../../interfaces";
import getReservations from "@/libs/Reservations/getReservations";
import { AppDispatch } from "@/redux/store";
import { fetchReservation, removeReservation } from "@/redux/features/cartSlice";
import { useSelector,useDispatch  } from "react-redux";
import { RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import deleteReservation from "@/libs/Reservations/deleteReservation";
import Link from "next/link";

const ReservationCart = () => {

    const dispatch = useDispatch<AppDispatch>();
    const reservationArr = useSelector((state: RootState) => state.cart.reservationItems);
    const { data:session } = useSession();
    const token = session?.user.token;

    useEffect(() => {
        const fetchData = async () => {
            if(token){
                const response = await getReservations(token);
                dispatch(fetchReservation(response.data));
            }
        }
        fetchData();
    }, [token, dispatch])

    if(reservationArr.length == 0){
        return <div>No booking</div>
    }
    // console.log(reservationArr);

    const deleteAction = (id:string,reservationItem:ReservationItem) => {
        try {
            deleteReservation(id,token); // database
            dispatch(removeReservation(reservationItem)); // redux
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                reservationArr.map((reservationItem:ReservationItem) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 text-black" key={reservationItem._id}>
                        <div className="text-sm">{reservationItem.date}</div>
                        {
                            reservationItem.shop ? <div className="text-sm">{reservationItem.shop.name}</div> : null
                        }
                        <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600" onClick={() => {deleteAction(reservationItem._id,reservationItem)}}>
                            Delete
                        </button>
                        <Link href={`edit/${reservationItem._id}`}>
                            <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
                                Edit
                            </button>
                        </Link>
                    </div>
                ))
            }
        </>
    )
}

export default ReservationCart