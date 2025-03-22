export interface ReservationItem {
    _id: string,
    user: string,
    shop: number,
    date: string,
    createdAt: string,
    __v: string,
}

export interface ReservationJson {
    count: number,
    data: ReservationItem[]
}
