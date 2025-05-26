import type { BikeModel } from "./bike.model"

export interface ReservationModel{
    reservationId: number
    userId: number
    bikeId: number
    totalPrice: number
    reservedUntil: string
    status: string
    createdAt: string
    updatedAt: string
    bike?: BikeModel
}