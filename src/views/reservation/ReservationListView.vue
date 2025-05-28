<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hooks';
import type { ReservationModel } from '@/models/reservation.model';
import { ReservationService } from '@/services/reservation.service';
import { formatDate, showConfirm } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const logout = useLogout()
const reservations = ref<ReservationModel[]>([]);
const router = useRouter()

onMounted(async () => {
    await fetchReservations();
});

function fetchReservations() {
    ReservationService.getMyReservations()
        .then(rsp => reservations.value = rsp.data)
        .catch((e) => logout(e))
}

async function cancelReservation(reservationId: number) {
    showConfirm('Are you sure you want to cancel this reservation?', async () => {
        await ReservationService.deleteReservation(reservationId);
        await fetchReservations()
    })
}


function payReservation(model: ReservationModel) {

    showConfirm(`Pay reservation for ${model.bike?.brand} ${model.bike?.model}?`, () => {
        ReservationService.payReservation(model.reservationId)
            .then(rsp => fetchReservations())
            .catch(e => logout(e))
    })
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

        <div class="container mt-4" v-if="reservations.length > 0">
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
                                    <p class="card-text fs-5 mb-1">
                                        Status: <span :class="{
                                            'badge bg-warning': reservation.status === 'pending_payment',
                                            'badge bg-success': reservation.status === 'completed',
                                            'badge bg-danger': reservation.status === 'canceled'
                                        }">{{
                                                    reservation.status }}</span>
                                    </p>
                                    <p class="card-text mb-1">Reservation valid until: {{
                                        formatDate(reservation.reservedUntil) }}
                                    </p>
                                    <p class="card-text mb-0">Total price for reservation: <strong>{{ reservation.totalPrice
                                        ?
                                        reservation.totalPrice : 'N/A' }} €</strong></p>
                                    <p class="card-text text-small text-muted">Created at: {{
                                        formatDate(reservation.createdAt) }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-end">
                            <template v-if="reservation.paidAt == null">
                                <RouterLink v-if="reservation.bike" :to="`/bikes/${reservation.bike.bikeId}`"
                                    class="btn btn-sm btn-outline-primary me-1">
                                    <i class="fa-solid fa-circle-info"></i> Bike details
                                </RouterLink>
                                <button v-if="['pending_payment'].includes(reservation.status)"
                                    @click="cancelReservation(reservation.reservationId)"
                                    class="btn btn-sm btn-danger me-1">
                                    <i class="fa-regular fa-credit-card"></i> Cancel reservation
                                </button>
                                <button v-if="['pending_payment'].includes(reservation.status)"
                                    @click="payReservation(reservation)" class="btn btn-sm btn-warning me-1">
                                    <i class="fa-regular fa-credit-card"></i> Go to payment
                                </button>
                            </template>
                            <template v-else>
                                <RouterLink v-if="reservation.bike" :to="`/bikes/${reservation.bike.bikeId}`"
                                    class="btn btn-sm btn-outline-primary me-1">
                                    <i class="fa-solid fa-circle-info"></i> Bike details
                                </RouterLink>
                                <RouterLink v-if="reservation.bike" :to="`/reservation/${reservation.reservationId}/details`"
                                    class="btn btn-sm btn-outline-success me-1">
                                    <i class="fa-solid fa-circle-info"></i> Reservation details
                                </RouterLink>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            You dont have any reservations!
        </div>
    </div>
    <Loading v-else />
</template>