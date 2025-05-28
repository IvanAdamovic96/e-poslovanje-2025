<script lang="ts" setup>
import { AuthService } from '@/services/auth.service';
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hooks';
import type { BikeModel } from '@/models/bike.model';
import type { ReservationModel } from '@/models/reservation.model';
import { BikeService } from '@/services/bike.service';
import { ReservationService } from '@/services/reservation.service';
import { formatDate, showConfirm, showError } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const bikeId = String(route.params.id)
const bike = ref<BikeModel |  null>(null)
/* const reservation = ref<ReservationModel>({
    reservationId: 0,
    userId: 0,
    bikeId: 0,
    totalPrice: 0,
    reservedUntil: '',
    status: 'pending_payment',
    createdAt: '',
    updatedAt: ''
}) */

const reservationMessage = ref<string>('')
const errorMessage = ref<string>('')

const FIXED_RESERVATION_FEE = 100.00; //100e
const RESERVATION_HOLD_HOURS = 120;

BikeService.getBikeById(bikeId)
    .then(rsp => bike.value = rsp.data)
    .catch((e) => showError(e))




async function submitReservation() {

    if (!bike.value || typeof bike.value.bikeId !== 'number') {
        showError('Bike not available or ID is missing!')
        return;
    }

    const currentBike = bike.value

    showConfirm(`Are you sure you want to make this reservation?`, async () => {
        await ReservationService.createReservation({
            bikeId: currentBike.bikeId
        })
        .catch((e) => showError(e))
        
        router.push('/reservation')

    })
}



</script>


<template>

    <Navigation />
    <div v-if="bike">
        <nav class="mt-4" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/bikes">Bikes</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="`/bikes/${bike.bikeId}`">
                        {{ bike.bikeId }}
                    </RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Reservation
                </li>
            </ol>
        </nav>
        <h1 class="mb-5">Reservation</h1>
        <div class="row">
            <div class="col-12 col-md-12">
                <div class="card shadow-sm">
                    <div class="card-header">
                        Reservation details
                    </div>
                    <div class="card-body">
                        <h3 class="card-title mb-3">The motorbike you are booking:</h3>
                        <div class="d-flex align-items-center mb-4">
                            <img :src="bike.image" class="img-fluid rounded-start me-3"
                                style="width: 100px; height: 75px; object-fit: cover;" :alt="bike.model">
                            <div>
                                <h5 class="mb-0">{{ bike.brand }} {{ bike.model }} ({{ bike.year }})</h5>
                                <p class="text-muted mb-0">{{ bike.category }} | {{ bike.displacement }}cc</p>
                                <h4 class="fw-bold mt-2">{{ bike.price }} €</h4>
                            </div>
                        </div>

                        <div class="alert alert-info" role="alert">
                            **Advance amount for reservation:** <strong class="fs-4">{{ FIXED_RESERVATION_FEE.toFixed(2)
                            }} €</strong>
                        </div>
                        <p>
                            By paying an advance of **<b>{{ FIXED_RESERVATION_FEE.toFixed(2) }} €</b>**, motorbike **{{
                                bike.brand }} {{
                                bike.model }}** will be reserved for you for the period of **<b>{{ RESERVATION_HOLD_HOURS }}
                            hours / 5 days</b>**. During this period, the engine will not be available to other customers.
                        </p>
                        <p class="small text-muted">
                            The advance is included in the total price of the engine. If you do not contact us within
                            the specified period, the reservation is automatically canceled and the advance payment is
                            not returned.
                        </p>

<!--                         <div v-if="reservationMessage" class="alert alert-success mt-3" role="alert">
                            {{ reservationMessage }}
                        </div>
                        <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
                            {{ errorMessage }}
                        </div> -->

                        <button type="button" @click="submitReservation" class="btn btn-success w-100 mt-3">
                            Confirm the reservation
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <Loading v-else />
</template>