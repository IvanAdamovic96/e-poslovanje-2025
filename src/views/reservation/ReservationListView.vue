<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import type { ReservationModel } from '@/models/reservation.model';
import { ReservationService } from '@/services/reservation.service';
import { formatDate } from '@/utils';
import { onMounted, ref } from 'vue';

const reservations = ref<ReservationModel[]>([]);
const errorMessage = ref('');
const successMessage = ref('');

onMounted(async () => {
    await fetchReservations();
    /* try {
        reservations.value = await ReservationService.getMyReservations();
    } catch (error: any) {
        console.error('Error fetching reservations:', error);
        errorMessage.value = 'Greška pri učitavanju rezervacija. Molimo pokušajte ponovo.';
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message;
        }
    } */
});

async function fetchReservations() {
    errorMessage.value = '';
    successMessage.value = '';
    try {
        reservations.value = await ReservationService.getMyReservations();
    } catch (error: any) {
        console.error('Error fetching reservations:', error);
        errorMessage.value = 'Error loading reservations. Please try again.';
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message;
        }
    }
}

async function cancelReservation(reservationId: number) {
    if (confirm('Are you sure you want to cancel this reservation?')) {
        try {
            await ReservationService.deleteReservation(reservationId);
            successMessage.value = 'Reservation cancelled successfully!';
            await fetchReservations();
        } catch (error: any) {
            console.error('Error canceling reservation:', error);
            errorMessage.value = 'Error canceling a reservation. Please try again.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage.value = error.response.data.message;
            }
        }
    }
}


</script>

<template>
    <Navigation />
    <div v-if="reservations">
        <nav class="mt-4" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/user">Profile</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Reservations
                </li>
            </ol>
        </nav>

        <div class="container mt-4">
            <h1 class="mb-4">My reservations</h1>

            <div ass="row row-cols-1 g-4">
                <div v-for="reservation of reservations" :key="reservation.reservationId" class="col">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <img v-if="reservation.bike && reservation.bike.image" :src="reservation.bike.image"
                                    class="img-fluid rounded-start me-3"
                                    style="width: 100px; height: 75px; object-fit: cover;"
                                    :alt="reservation.bike.model">
                                <div>
                                    <h5 class="card-title mb-1">
                                        <span v-if="reservation.bike">{{ reservation.bike.brand }} {{
                                            reservation.bike.model
                                            }} ({{ reservation.bike.year }})</span>
                                        <span v-else>Bike not found</span>
                                    </h5>
                                    <p class="card-text text-muted mb-1">
                                        Status: <span
                                            :class="{ 'badge bg-warning': reservation.status === 'pending_payment', 'badge bg-success': reservation.status === 'confirmed', 'badge bg-danger': reservation.status === 'canceled' }">{{
                                                reservation.status }}</span>
                                    </p>
                                    <p class="card-text mb-1">Reservation valid until: {{
                                        formatDate(reservation.reservedUntil) }}
                                    </p>
                                    <p class="card-text mb-0">Total price for payment: <strong>{{ reservation.totalPrice
                                        ?
                                        reservation.totalPrice : 'N/A' }} €</strong></p>
                                    <p class="card-text text-small text-muted">Created at: {{
                                        formatDate(reservation.createdAt) }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-end">
                            <RouterLink v-if="reservation.bike" :to="`/bikes/${reservation.bike.bikeId}`"
                                class="btn btn-sm btn-outline-primary me-1">
                                <i class="fa-solid fa-circle-info"></i> Bike details
                            </RouterLink>
                            <button v-if="['pending_payment', 'confirmed'].includes(reservation.status)"
                                @click="cancelReservation(reservation.reservationId)" class="btn btn-sm btn-danger">
                                <i class="fa-regular fa-credit-card"></i> Cancel reservation
                            </button>
                            <RouterLink v-if="reservation.bike" :to="`/bikes/${reservation.bike.bikeId}`"
                                class="btn btn-sm btn-warning">
                                <i class="fa-regular fa-credit-card"></i> Go to payment
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="successMessage" class="alert alert-success" role="alert">
                {{ successMessage }}
            </div>
        </div>
    </div>
    <Loading v-else />
</template>