'use client'
import { Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import getAllShops from "@/libs/Shops/getAllShops";
import { Shop, ShopJson, UpdateReservationDto } from "../../../../interfaces";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import updateReservation from "@/libs/Reservations/updateReservation";
import { useSession } from "next-auth/react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { updateReservation as updateReservationRedux } from "@/redux/features/cartSlice";
import { useRouter, useSearchParams } from "next/navigation";

const EditBookingPage = ({ params }: { params: { id: string } }) => {

  const searchParams = useSearchParams();
  const defaultShopId = searchParams.get("shopId") || null;
  const defaultDate = searchParams.get("date") || null;
  const defaultDateObj = defaultDate ? dayjs(defaultDate, "YYYY/MM/DD") : null;

  const [shops, setShops] = useState<Shop[] | null>(null);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(defaultShopId || null);
  const [date, setDate] = useState<Dayjs | null>(defaultDateObj || null);
  const { data: session } = useSession();
  const token = session?.user.token;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchShop = async () => {
      const response: ShopJson = await getAllShops();
      if (response.success) {
        setShops(response.data);
      }
    };
    fetchShop();
  }, []);

  if (!shops) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  const updateReser = async () => {
    const reservationId = params.id;
    const selectedShop = shops?.find((shop) => shop._id === reservationId);
    try {
      if (selectedShop) {
        const updateReduxBody = {
          id: reservationId,
          shop: selectedShop,
          date: dayjs(date).format("YYYY/MM/DD"),
        };
        dispatch(updateReservationRedux(updateReduxBody));
      }
      if (selectedShopId) {
        const body: UpdateReservationDto = {
          shop: selectedShopId,
          date: dayjs(date).format("YYYY/MM/DD"),
        };
        await updateReservation(reservationId, token, body);
        router.push("/mybooking");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg my-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Edit Reservation</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="shop" className="block text-gray-700 font-medium mb-1">Shop:</label>
          <Select
            id="demo-simple-select"
            onChange={(e) => setSelectedShopId(e.target.value)}
            value={selectedShopId || ""}
            className="w-full bg-white"
          >
            {shops.map((shop) => (
              <MenuItem key={shop._id} value={shop._id} className="text-black">
                {shop.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="w-full bg-white"
            value={date}
            onChange={(newDate) => setDate(newDate)}
          />
        </LocalizationProvider>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          onClick={(e) => {
            e.preventDefault();
            updateReser();
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBookingPage;
