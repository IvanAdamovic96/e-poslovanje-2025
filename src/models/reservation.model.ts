import type { BikeModel } from "./bike.model"

export interface ReservationModel{
    reservationId: number
    userId: number
    bikeId: number
    totalPrice: number
    reservedUntil: string
    status: string
    paidAt: null | string
    transactionId: null | number
    createdAt: string
    updatedAt: string
    bike?: BikeModel
}