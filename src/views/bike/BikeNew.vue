<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hooks';
import type { BikeModel } from '@/models/bike.model';
import { BikeService } from '@/services/bike.service';
import { showError } from '@/utils';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const logout = useLogout()

const bike = ref<BikeModel>({
    bikeId: 0,
    vin: '',
    brand: '',
    model: '',
    year: 0,
    category: '',
    displacement: 0,
    power: 0,
    torque: 0,
    fuel: '',
    transmission: '',
    color: '',
    price: 0,
    description: '',
    image: '',
    engineType: '',
    cooling: '',
    weight: 0,
    createdAt: '',
    updatedAt: null
});

function save() {
    if (bike.value == null) return
    if (bike.value.vin == '' || bike.value.brand == '' || bike.value.model == '' ||
        bike.value.year == 0 || bike.value.category == '' || bike.value.displacement == 0 ||
        bike.value.power == 0 || bike.value.torque  == 0 || bike.value.fuel  == '' || bike.value.transmission == '' ||
        bike.value.color == '' || bike.value.price == 0 || bike.value.description == '' ||
        bike.value.image == '' || bike.value.engineType == ''|| bike.value.cooling == '' || bike.value.weight == 0
    ) {
        showError('All field must have values!')
        //alert('All field must have values!')
        return
    }

    BikeService.createBike(bike.value)
        .then(rsp => {
            router.push('/bikes')
        })
        .catch((e) => showError(e))
}

</script>


<template>
    <Navigation />
    <div class="container">
        <div class="col-12 col-md-8">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <RouterLink to="/">Home</RouterLink>
                    </li>
                    <li class="breadcrumb-item">
                        <RouterLink to="/bikes">Bikes</RouterLink>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        New bike
                    </li>
                </ol>
            </nav>

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
                    </div>
                </div>


                <button type="submit" class="btn btn-primary">
                    <i class="fa-regular fa-floppy-disk"></i> Create
                </button>
            </form>
        </div>
    </div>

</template>