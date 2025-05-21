<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import type { CinemaModel } from '@/models/cinema.model';
import { CinemaService } from '@/services/cinema.service';
import { formatDate } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const cinema = ref<CinemaModel>()
CinemaService.getCinemaById(id)
    .then(rsp => {
        cinema.value = rsp.data
    })


function save() {
    if (cinema.value == null) return

    CinemaService.updateCinema(id, cinema.value).then(rsp => {
        router.push('/cinema')
    })
}
</script>

<template>
    <Navigation />
    <div v-if="cinema">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/cinema">Cinemas</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    {{ cinema.name }}
                </li>
            </ol>
        </nav>

        <form v-on:submit.prevent="save">
            <div class="mb-3">
                <label for="name" class="form-label">Name: </label>
                <input type="text" class="form-control" id="name" v-model="cinema.name">
            </div>
            <div class="mb-3">
                <label for="location" class="form-label">Location: </label>
                <input type="text" class="form-control" id="location" v-model="cinema.location">
            </div>
            <div class="mb-3">
                <label for="updated" class="form-label">Updated: </label>
                <input type="text" class="form-control" id="updated"
                    :value="formatDate(cinema.updatedAt ?? cinema.createdAt)" disabled>
            </div>
            <button type="submit" class="btn btn-primary">
                <i class="fa-regular fa-floppy-disk"></i> Save
            </button>
        </form>
    </div>

</template>