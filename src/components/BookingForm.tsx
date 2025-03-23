'use client'
import { Select, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import getAllShops from "@/libs/Shops/getAllShops"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs";
import { Shop, ShopJson } from "../../interfaces"
import CircularProgress from '@mui/material/CircularProgress';

const BookingForm = ({onSubmit} : {onSubmit:Function}) => {

  const [shops, setShops] = useState<Shop[]|null>(null);
  const [selectedShopId, setSelectedShopId] = useState<string|null>(null);
  const [date, setDate] = useState<Dayjs | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShop = async () => {
      const response:ShopJson = await getAllShops();
      if(response.success){
        setShops(response.data);
        setLoading(false);
      }
    }
    fetchShop();
  }, [])

  if(loading){
    return (
      <div className="flex justify-center items-center my-auto h-screen">
        <CircularProgress/>
      </div>
    )
  }

  return (
    <div>
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
      <button type="submit" className="p-2" onClick={(e) => {e.preventDefault(); onSubmit(date,selectedShopId)}}>Save Changes</button>
    </form>
  </div>
  )
}

export default BookingForm