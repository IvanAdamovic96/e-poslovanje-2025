<script lang="ts" setup>
import type { CinemaModel } from '@/models/cinema.model';
import { CinemaService } from '@/services/cinema.service';
import { ref } from 'vue';
import { formatDate, showConfirm } from '@/utils';
import Navigation from '@/components/Navigation.vue';
import type { BikeModel } from '@/models/bike.model';
import { useRoute, useRouter } from 'vue-router';
import { BikeService } from '@/services/bike.service';
import Loading from '@/components/Loading.vue';
import { useLogout } from '@/hooks/logout.hooks';
import { BookmarkService } from '@/services/bookmark.service';
import { AuthService } from '@/services/auth.service';

const route = useRoute()
const router = useRouter()
const logout = useLogout()

const bike = ref<BikeModel>()

BikeService.getBikeById(route.params.id as string)
    .then(rsp => bike.value = rsp.data)
    .catch((e) => logout(e))


function deleteBike(id: number) {
    showConfirm(`Are you sure you want to delete ${bike.value?.model}`, () => {
        BikeService.deleteBikeById(id)
            .then(rsp => {
                router.push('/bikes')
            })
            .catch((e) => logout(e))
    })
}


</script>

<template>
    <Navigation />
    <nav class="mt-4" aria-label="breadcrumb" v-if="bike">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/">Home</RouterLink>
            </li>
            <li class="breadcrumb-item">
                <RouterLink to="/bikes">Bikes</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                {{ bike.brand }} ({{ bike.model }})
            </li>
        </ol>
    </nav>
    <div class="container mt-5">
        <div class="row justify-content-center" v-if="bike">
            <div class="col-md-5 pe-5">
                <div class="card shadow-lg mb-1">
                    <img :src="bike.image" class="card-img-top" :alt="bike.model">
                </div>
                <div v-if="AuthService.getRefreshToken()">
                    <RouterLink class="btn btn-info" :to="`/bikes/edit/${bike.bikeId}`"><i
                            class="fa-regular fa-pen-to-square"></i>
                        Edit
                    </RouterLink>
                    <button class="btn btn-danger ms-1" @click="deleteBike(bike.bikeId)"><i
                            class="fa-regular fa-trash-can"></i>
                        Delete
                    </button>
                </div>


            </div>
            <div class="col">
                <div class="card-body">
                    <h1 class="card-title pb-2 fw-bold">{{ bike.brand }} - {{ bike.model }}</h1>
                    <p class="card-text"><strong>VIN:</strong> {{ bike.vin }}</p>
                    <p class="card-text"><strong>Year:</strong> {{ bike.year }}</p>
                    <p class="card-text"><strong>Displacement:</strong> {{ bike.displacement }} cc</p>
                    <h2 class="card-text"><strong>Price:</strong> {{ bike.price }} €</h2>
                </div>
                <div class="card-footer">
                    <div class="button-group d-flex justify-content-between">
                        <p class="card-text mt-3"><small class="text-muted">Created at: {{ formatDate(bike.createdAt)
                        }}</small></p>
                        <!-- <RouterLink to="/bikes" class="btn btn-info mt-3">Go back</RouterLink> -->

                        <RouterLink class="btn btn-warning mt-3" :to="`/bikes/${bike.bikeId}/reservation`">
                            <i class="fa-solid fa-ticket"></i> Make a reservation
                        </RouterLink>
                    </div>
                </div>
            </div>
            <div class="row pt-5">
                <div class="col">
                    <p class="card-text"><strong>Power:</strong> {{ bike.power }} KS</p>
                    <p class="card-text"><strong>Torque:</strong> {{ bike.torque }} Nm</p>
                    <p class="card-text"><strong>Fuel:</strong> {{ bike.fuel }}</p>
                    <p class="card-text"><strong>Transmission:</strong> {{ bike.transmission }}</p>
                    <p class="card-text"><strong>Engine type:</strong> {{ bike.engineType }}</p>
                </div>
                <div class="col">
                    <p class="card-text"><strong>Category:</strong> {{ bike.category }}</p>
                    <p class="card-text"><strong>Cooling:</strong> {{ bike.cooling }}</p>
                    <p class="card-text"><strong>Color:</strong> {{ bike.color }}</p>
                    <p class="card-text"><strong>Weight:</strong> {{ bike.weight }} kg</p>
                    <p class="card-text"><strong>Description:</strong> {{ bike.description }}</p>
                </div>
            </div>
        </div>
        <Loading v-else></Loading>
        <!-- <div v-else class="alert alert-warning" role="alert">
            Loading bike...
        </div> -->
    </div>
</template>



<style scoped>
.container {
    padding-bottom: 50px;
}
</style>