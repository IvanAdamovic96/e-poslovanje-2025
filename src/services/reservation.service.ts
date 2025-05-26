import type { ReservationModel } from "@/models/reservation.model";
import { useAxios } from "@/utils";

interface CreateReservationPayload {
    bikeId: number;
}

export class ReservationService {

    static async createReservation(payload: CreateReservationPayload) {
        console.log('Payload sent to useAxios:', payload);
        return await useAxios('/reservation', 'post', payload)
    }

    static async getMyReservations() {
        const response = await useAxios('/reservation', 'get');
        return response.data;
    }


    static async deleteReservation(reservationId: number) {
        await useAxios(`/reservation/${reservationId}`, 'delete');
    }

}