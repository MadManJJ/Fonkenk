export interface ReservationItem {
    carId: string,
    carModel: string,
    numOfDay: number,
    pickupDate: string,
    pickupLocation: string,
    returnDate: string,
    returnLocation: string
}

export interface CarItem {
    id: string,
    model: string,
    picture: string
}

export interface CarJson {
    count: number,
    data: CarItem[]
}