'use client'
import { Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import getAllShops from "@/libs/Shops/getAllShops";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { Shop, ShopJson } from "../../interfaces";
import CircularProgress from "@mui/material/CircularProgress";

const BookingForm = ({ onSubmit, defaultShopId }: { onSubmit: Function, defaultShopId?: string | null }) => {
    const [shops, setShops] = useState<Shop[] | null>(null);

    const [selectedShopId, setSelectedShopId] = useState<string | null>(defaultShopId || null);

    if(!defaultShopId && shops && !selectedShopId){
        setSelectedShopId(shops[0]._id)
    }

    const [date, setDate] = useState<Dayjs | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchShop = async () => {
            const response: ShopJson = await getAllShops();
            if (response.success) {
                setShops(response.data);
                setLoading(false);
            }
        };
        fetchShop();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 my-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-4">Book your massage</h1>
            <form className="space-y-4">
                <div>
                    <label htmlFor="shop" className="block text-gray-700 font-medium mb-1">Shop:</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedShopId}
                        onChange={(e) => setSelectedShopId(e.target.value)}
                        className="w-full bg-white text-gray-900"
                    >
                        {shops?.map((shop) => (
                            <MenuItem key={shop._id} value={shop._id}>{shop.name}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Select Date:</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2"
                            value={date} 
                            onChange={(newDate) => setDate(newDate)}
                        />
                    </LocalizationProvider>
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={(e) => { e.preventDefault(); onSubmit(date, selectedShopId); }}
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
