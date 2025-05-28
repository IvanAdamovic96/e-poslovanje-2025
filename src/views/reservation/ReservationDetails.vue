<script lang="ts" setup>
import Loading from '@/components/Loading.vue'
import Navigation from '@/components/Navigation.vue'
import type { BikeModel } from '@/models/bike.model'
import type { ReservationModel } from '@/models/reservation.model'
import { BikeService } from '@/services/bike.service'
import { ReservationService } from '@/services/reservation.service'
import { formatDate, showError } from '@/utils'
import { ref } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute()
const id = Number(route.params.id)
const reservation = ref<ReservationModel>()
const bike = ref<BikeModel>()


ReservationService.getReservationById(id)
    .then(rsp => {
        reservation.value = rsp.data
        const bikeId = String(rsp.data.bikeId)
        BikeService.getBikeById(bikeId)
            .then(rsp => bike.value = rsp.data)
            .catch(e => showError(e))
    })
    .catch(e => showError(e))


</script>

<template>
    <Navigation />
    <div v-if="reservation && bike">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/user">Profile</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/reservation">Reservations</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    {{ bike.brand }}
                </li>
            </ol>
        </nav>
        <div class="row mb-3">
            <div class="col-12 col-md-8">
                <h3>Details</h3>
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row">Reservation:</th>
                            <td>{{ reservation.reservationId }}-{{ bike.bikeId }}-{{ bike.vin }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Brand:</th>
                            <td>{{ bike.brand }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Model:</th>
                            <td>{{ bike.model }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Category:</th>
                            <td>{{ bike.category }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Status:</th>
                            <td>{{ reservation.status }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Description:</th>
                            <td>{{ bike.description }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Year:</th>
                            <td>{{ reservation.bike?.year }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Reserved until:</th>
                            <td>{{ formatDate(reservation.reservedUntil) }}</td>
                        </tr>
                        <tr v-if="reservation.paidAt">
                            <th scope="row">Paid at:</th>
                            <td>{{ formatDate(reservation.paidAt) }}</td>
                        </tr>
                    </tbody>
                </table>
                <img class="rounded image-reserved" :src="`${bike.image}`" :alt="`${bike.brand} ${bike.model}`">
            </div>
            <div class="col-12 col-md-4">
                <div class="text-center mx-auto invoice">
                    <h5>Fiscal Account</h5>
                    <p class="m-0">**********************</p>
                    <p class="m-0">Praktikum Sistemi E-Poslovanja</p>
                    <p class="m-0">Tehnicki Fakultet</p>
                    <p class="m-0">Univerzitet Singidunum</p>
                    <p class="m-0">Nikole Pasica 28, 18000 Nis</p>
                    <p class="m-0">**********************</p>
                    <p class="m-0">Cashier: Online Payment</p>
                    <p class="m-0">Code: #0001</p>
                    <p class="m-0">**********************</p>
                    <p class="m-0" v-if="reservation.paidAt">
                        {{ reservation.reservationId }} {{ bike.brand }} u {{ formatDate(reservation.paidAt) }}
                    </p>
                    <p class="m-0">Total: {{ reservation.totalPrice }}</p>
                    <p class="m-0">**********************</p>
                    <p class="m-0" v-if="reservation.paidAt">
                        {{ formatDate(reservation.paidAt) }}
                    </p>
                    <img
                        :src="`https://quickchart.io/qr?text=https://sim.purs.singidunum.ac.rs/?token=${reservation.transactionId}`">
                    <p class="m-0">**********************</p>
                    <p class="m-0">End of Fiscal Account</p>
                    <p class="m-0">**********************</p>
                    <img :src="`https://barcodeapi.org/api/auto/${reservation.bike?.vin}?`">
                </div>
            </div>
        </div>
    </div>
    <Loading v-else />
</template>


<style>
.fa-star {
    color: goldenrod;
}

.invoice {
    font-size: 13px;
}

.invoice img {
    max-width: 90px;
}

.image-reserved{
    width: 400px;
}

</style>