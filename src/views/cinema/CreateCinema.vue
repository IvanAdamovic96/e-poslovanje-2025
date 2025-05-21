<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { CinemaService } from '@/services/cinema.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const cinema = ref<any>({
    name: '',
    location: ''
})

function save() {
    if (cinema.value == null) return
    if (cinema.value.name == '' || cinema.value.location == '') {
        alert('Fields are required!!!')
        return
    }
    CinemaService.createCinema(cinema.value).then(rsp => {
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
                    New Cinema
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
            <button type="submit" class="btn btn-primary">
                <i class="fa-regular fa-floppy-disk"></i> Save
            </button>
        </form>
    </div>

</template>