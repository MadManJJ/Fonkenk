"use client"
import { addShop } from "@/redux/features/shopSlice"
import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getAllShops from "@/libs/Shops/getAllShops";
import { Shop, ShopJson } from "../../interfaces";
import CircularProgress from '@mui/material/CircularProgress';

export default function ShopList() {
    const [shops, setShops] = useState<Shop[] | null>(null);
    const shopItems = useAppSelector((state) => state.shop.shop)
    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true)

    const token = session?.user.token;

    useEffect(() => {
        const fetchShop = async () => {
            const response: ShopJson = await getAllShops();
            if (response.success) {
                setShops(response.data);
                // Optionally, you can dispatch to Redux to update the store
                response.data.forEach((shop: Shop) => {
                    dispatch(addShop(shop)); // Add each shop to the Redux store
                });
                setLoading(false);
            }
        }
        fetchShop();
    }, [dispatch]); // Add dispatch as dependency

    if (loading) {
        return (
            <div className="flex justify-center items-center my-auto h-screen">
                <CircularProgress />
            </div>
        )
    }

    return (
        <>
  {shopItems.length === 0 ? (
    <div className="flex items-center justify-center w-full h-screen bg-blue-900">
      <div className="text-center text-2xl text-red-600 font-semibold">
        No Shops Available
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {shopItems.map((shopItem) => (
        <div
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
          key={shopItem.name}
        >
          <div className="text-2xl font-semibold text-gray-800">{shopItem.name}</div>
          <div className="text-sm text-gray-600 mt-2">Address: {shopItem.address}</div>
          <div className="text-sm text-gray-600 mt-1">Open Time: {shopItem.openTime}</div>
          <div className="text-sm text-gray-600 mt-1">Close Time: {shopItem.closeTime}</div>
          <div className="text-sm text-gray-600 mt-1">Phone Number: {shopItem.telephone}</div>
          <div className="mt-4">
            <button className="w-full mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</>

    )
}
