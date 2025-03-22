import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interfaces";

type CartState = {
    reservationItems: ReservationItem[]
}

const initialState:CartState = { reservationItems: [] }

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addReservation: (state, action:PayloadAction<ReservationItem>) => {
            state.reservationItems.push(action.payload)
        },
        removeReservation: (state, action:PayloadAction<ReservationItem>) => {
            const remainItem = state.reservationItems.filter(obj => {
                return (obj._id !== action.payload._id)
                })
            state.reservationItems = remainItem
        },
        fetchReservation: (state, action:PayloadAction<ReservationItem[]>) => {
            state.reservationItems = action.payload;
        }
    }
});

export const { addReservation, removeReservation, fetchReservation } = cartSlice.actions
export default cartSlice.reducer