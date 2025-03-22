'use client'
import { Select, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import getAllShops from "@/libs/Shops/getAllShops"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react"
import { AppDispatch } from "@/redux/store"
import { useDispatch  } from "react-redux";
import { addReservation } from "@/redux/features/cartSlice"
import { useRouter } from 'next/navigation';
import { Shop, ShopJson } from "../../../interfaces"
import createReservation from "@/libs/Reservations/createReservation"

const BookingPage = () => {

  const [shops, setShops] = useState<Shop[]|null>(null);
  const [selectedShopId, setSelectedShopId] = useState<string|null>(null);
  const [date, setDate] = useState<Dayjs | null>(null)

  const { data:session } = useSession();
  const token = session?.user.token;

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchShop = async () => {
      const response:ShopJson = await getAllShops();
      if(response.success){
        setShops(response.data);
      }
    }
    fetchShop();
  }, [])

  const handleSubmit = async () => {
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
    <h1>Edit Reservation</h1>
    <form className="bg-white text-black p-2">
      <div>
        <label htmlFor="shop">Shop:</label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Shop"
          onChange={(e) => {setSelectedShopId(e.target.value)}}
          value={selectedShopId}
          className="text-black"
        >
          {
            shops?.map((shop) => (
              <MenuItem key={shop._id} value={shop._id} className="text-black">{shop.name}</MenuItem>
            )) 
          }
        </Select>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker className="bg-white block" value={date} onChange={(newDate) => setDate(newDate)}/>
      </LocalizationProvider>
      <button type="submit" className="p-2" onClick={(e) => {e.preventDefault(); handleSubmit()}}>Save Changes</button>
    </form>
  </div>
  )
}

export default BookingPage