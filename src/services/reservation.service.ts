import type { ReservationModel } from "@/models/reservation.model";
import { UserService } from "./user.service";


interface CreateReservationPayload {
    bikeId: number;
}

export class ReservationService {

    static async createReservation(payload: CreateReservationPayload) {
        console.log('Payload sent to useAxios:', payload);
        return await UserService.useAxios('/reservation', 'post', payload)
    }
    
    static async getReservationById(id: number) {
        return await UserService.useAxios<ReservationModel>(`/reservation/${id}`)
    }

    static async getMyReservations() {
        return await UserService.useAxios<ReservationModel[]>('/reservation');
    }


    static async payReservation(id: number){
        return await UserService.useAxios(`/reservation/${id}/pay`, 'put')
    }

    static async deleteReservation(reservationId: number) {
        return await UserService.useAxios(`/reservation/${reservationId}`, 'delete');
    }



}