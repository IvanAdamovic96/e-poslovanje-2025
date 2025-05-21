<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hooks';
import type { BikeModel } from '@/models/bike.model';
import type { CinemaModel } from '@/models/cinema.model';
import { BikeService } from '@/services/bike.service';
import { CinemaService } from '@/services/cinema.service';
import { formatDate } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const logout = useLogout()

const id = Number(route.params.id)
const cinema = ref<CinemaModel>()

const bike = ref<BikeModel>()


BikeService.getBikeById(route.params.id as string)
    .then(rsp => bike.value = rsp.data)
    .catch((e) => logout())

function save() {
    if (bike.value == null) return
    BikeService.updateBike(id, bike.value)
        .then(rsp => {
            router.push('/bikes')
        })
        .catch((e) => logout())
}

</script>

<template>
    <Navigation />
    <div v-if="bike">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/bikes">Bikes</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Edit bike
                </li>
            </ol>
        </nav>
        <h1>Edit bike</h1>
        <form v-on:submit.prevent="save">

            <div class="row">
                <div class="col">
                    <div class="mb-3">
                        <label for="vin" class="form-label">VIN: </label>
                        <input type="text" class="form-control" id="vin" v-model="bike.vin">
                    </div>
                    <div class="mb-3">
                        <label for="brand" class="form-label">Brand: </label>
                        <input type="text" class="form-control" id="brand" v-model="bike.brand">
                    </div>
                    <div class="mb-3">
                        <label for="model" class="form-label">Model: </label>
                        <input type="text" class="form-control" id="model" v-model="bike.model">
                    </div>
                    <div class="mb-3">
                        <label for="year" class="form-label">Year: </label>
                        <input type="number" class="form-control" id="year" v-model="bike.year">
                    </div>
                    <div class="mb-3">
                        <label for="category" class="form-label">Category: </label>
                        <input type="text" class="form-control" id="category" v-model="bike.category">
                    </div>
                    <div class="mb-3">
                        <label for="displacement" class="form-label">Displacement: </label>
                        <input type="number" class="form-control" id="displacement" v-model="bike.displacement">
                    </div>
                    <div class="mb-3">
                        <label for="power" class="form-label">Power: </label>
                        <input type="number" class="form-control" id="power" v-model="bike.power">
                    </div>
                    <div class="mb-3">
                        <label for="torque" class="form-label">Torque: </label>
                        <input type="number" class="form-control" id="torque" v-model="bike.torque">
                    </div>
                    <div class="mb-3">
                        <label for="fuel" class="form-label">Fuel: </label>
                        <input type="text" class="form-control" id="fuel" v-model="bike.fuel">
                    </div>
                </div>
                <div class="col">
                    <div class="mb-3">
                        <label for="transmission" class="form-label">Transmission: </label>
                        <input type="text" class="form-control" id="transmission" v-model="bike.transmission">
                    </div>
                    <div class="mb-3">
                        <label for="color" class="form-label">Color: </label>
                        <input type="text" class="form-control" id="color" v-model="bike.color">
                    </div>
                    <div class="mb-3">
                        <label for="price" class="form-label">Price: </label>
                        <input type="number" class="form-control" id="price" v-model="bike.price">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description: </label>
                        <input type="text" class="form-control" id="description" v-model="bike.description">
                    </div>
                    <div class="mb-3">
                        <label for="image" class="form-label">Image: </label>
                        <input type="text" class="form-control" id="image" v-model="bike.image">
                    </div>
                    <div class="mb-3">
                        <label for="engineType" class="form-label">Engine type: </label>
                        <input type="text" class="form-control" id="engineType" v-model="bike.engineType">
                    </div>
                    <div class="mb-3">
                        <label for="cooling" class="form-label">Cooling: </label>
                        <input type="text" class="form-control" id="cooling" v-model="bike.cooling">
                    </div>
                    <div class="mb-3">
                        <label for="weight" class="form-label">Weight: </label>
                        <input type="number" class="form-control" id="weight" v-model="bike.weight">
                    </div>
                    <div class="mb-3">
                        <label for="updated" class="form-label">Changed:</label>
                        <input type="text" class="form-control" id="updated"
                            :value="formatDate(bike.updatedAt ?? bike.createdAt)" disabled>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">
                <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
        </form>
    </div>
    <Loading v-else />
</template>