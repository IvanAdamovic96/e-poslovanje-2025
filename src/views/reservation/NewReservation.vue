<script lang="ts" setup>
import { AuthService } from '@/services/auth.service';
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hooks';
import type { BikeModel } from '@/models/bike.model';
import type { ReservationModel } from '@/models/reservation.model';
import { BikeService } from '@/services/bike.service';
import { ReservationService } from '@/services/reservation.service';
import { formatDate } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const logout = useLogout()

const bikeId = String(route.params.id)
const bike = ref<BikeModel>()
const reservation = ref<ReservationModel>({
    reservationId: 0,
    userId: 0,
    bikeId: 0,
    totalPrice: 0,
    reservedUntil: '',
    status: 'pending_payment',
    createdAt: '',
    updatedAt: ''
})

const reservationMessage = ref<string>('')
const errorMessage = ref<string>('')

const FIXED_RESERVATION_FEE = 100.00; //100e
const RESERVATION_HOLD_HOURS = 120;

BikeService.getBikeById(bikeId)
    .then(rsp => bike.value = rsp.data)




async function submitReservation() {
    errorMessage.value = '';
    reservationMessage.value = '';

    if (!bike.value) {
        errorMessage.value = 'Bike not available!';
        return;
    }

    try {
        const response = await ReservationService.createReservation({
            bikeId: bike.value.bikeId
        });

        router.push('/user');

    } catch (error: any) {
        console.error("Reservation error: ", error);
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message;
        } else {
            errorMessage.value = 'Error making a reservation. Please try again.';
        }
    }
}





/*
function submitReservation() {

    if (!bike.value) {
        errorMessage.value = 'Motor nije učitan.';
        return;
    }

    try {

    } catch (error: any) {
        console.error("Error making a reservation:", error);
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message;
        } else {
            errorMessage.value = 'Error making a reservation. Please try again!';
        }
    }

}*/


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
                            By paying an advance of **{{ FIXED_RESERVATION_FEE.toFixed(2) }} €**, motorbike **{{
                                bike.brand }} {{
                                bike.model }}** will be reserved for you for the period of **{{ RESERVATION_HOLD_HOURS }}
                            hours**. During this period, the engine will not be available to other customers.
                        </p>
                        <p class="small text-muted">
                            The advance is included in the total price of the engine. If you do not contact us within
                            the specified period, the reservation is automatically canceled and the advance payment is
                            not returned.
                        </p>

                        <div v-if="reservationMessage" class="alert alert-success mt-3" role="alert">
                            {{ reservationMessage }}
                        </div>
                        <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
                            {{ errorMessage }}
                        </div>

                        <button type="button" @click="submitReservation" class="btn btn-success w-100 mt-3">
                            Confirm the reservation
                        </button>
                    </div>
                </div>

            </div>
            <!-- <div class="col-12 col-md-6">
                <div class="card-holder" style="max-width: 540px;">
                    <div class="card" :key="bike.bikeId">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img :src="bike.image" class="card-img rounded" :alt="bike.model">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">{{ bike.brand }}</h5>
                                    <p class="card-text">{{ bike.description }}</p>
                                    <h4 class="card-text d-flex justify-content-end"><strong>{{ bike.price }} €</strong>
                                    </h4>
                                    <p class="card-text"><small class="text-body-secondary">{{ bike.createdAt }}</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <RouterLink :to="`/bikes/${bike.bikeId}`" class="btn btn-sm btn-info">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i> Details
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
    <Loading v-else />
</template>




<!-- 
<form @submit.prevent="submitReservation">
    <div class="mb-3">
        <label for="startDate" class="form-label">Datum preuzimanja:</label>
        <input type="date" class="form-control" id="startDate" v-model="startDate" required>
    </div>
    <div class="mb-3">
        <label for="endDate" class="form-label">Datum vraćanja:</label>
        <input type="date" class="form-control" id="endDate" v-model="endDate" required>
    </div>
    <div class="mb-3">
        <label for="totalPrice" class="form-label">Ukupna cena:</label>
        <input type="text" class="form-control" id="totalPrice"
            :value="calculateTotalPrice() + ' €'" readonly>
    </div>
    <div v-if="reservationMessage" class="alert alert-success mt-3" role="alert">
        {{ reservationMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
        {{ errorMessage }}
    </div>
    <button type="submit" class="btn btn-success w-100 mt-3">Potvrdi rezervaciju</button>
</form>
-->