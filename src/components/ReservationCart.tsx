'use client'
import { useEffect, useState } from "react";
import { ConnectedReservation, ReservationItem } from "../../interfaces";
import getReservations from "@/libs/Reservations/getReservations";
import { AppDispatch } from "@/redux/store";
import { fetchReservation, removeReservation } from "@/redux/features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import deleteReservation from "@/libs/Reservations/deleteReservation";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchUsers } from "@/redux/features/userSlice";
import getUsers from "@/libs/Users/getUsers";

const ReservationCart = () => {
    const dispatch = useDispatch<AppDispatch>();
    let reservationArr = useSelector((state: RootState) => state.cart.reservationItems);
    const userArr = useSelector((state: RootState) => state.user.user);

    const { data: session } = useSession();
    const token = session?.user.token;
    const [loading, setLoading] = useState(true);

    const connectedReservations = reservationArr.map((reservation) => {
        const userInfo = userArr.find((user) => user._id === reservation.user);
        return {
          ...reservation,
          userName: userInfo ? userInfo.name : "Unknown User", // Add user name
        };
      });



    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                const response = await getReservations(token);
                dispatch(fetchReservation(response.data));
            }
            if(userArr.length == 0 && token && session?.user.role == 'admin'){
                const response = await getUsers(token);
                dispatch(fetchUsers(response.data));
            }
            setLoading(false);
        };
        fetchData();
    }, [token, dispatch]);

    const deleteAction = (id: string, reservationItem: ReservationItem) => {
        try {
            deleteReservation(id, token);
            dispatch(removeReservation(reservationItem));
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (reservationArr.length === 0) {
        return <div className="text-center text-gray-500 text-lg mt-20">No Reservations</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-4">
            {connectedReservations.map((connectedReservation: ConnectedReservation) => (
                <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200" key={connectedReservation._id}>
                    <div className="text-gray-700 text-sm">{connectedReservation.date}</div>
                    {connectedReservation.shop && <div className="text-gray-900 font-medium text-base">{connectedReservation.shop.name}</div>}
                    {
                        session?.user.role == 'admin' 
                        ? <div className="text-gray-900 font-medium text-base">{connectedReservation.userName}</div> 
                        : <div className="text-gray-900 font-medium text-base">{session?.user.name}</div>
                    }
                    <div className="flex space-x-3 mt-3">
                        <button
                            className="bg-red-500 text-white py-1.5 px-4 rounded-lg hover:bg-red-600 transition"
                            onClick={() => deleteAction(connectedReservation._id, connectedReservation)}
                        >
                            Delete
                        </button>
                        <Link href={`edit/${connectedReservation._id}?shopId=${connectedReservation.shop._id}&date=${connectedReservation.date}`}>
                            <button className="bg-blue-500 text-white py-1.5 px-4 rounded-lg hover:bg-blue-600 transition">
                                Edit
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReservationCart;
