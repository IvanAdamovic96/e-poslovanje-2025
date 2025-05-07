<script setup lang="ts">
import type { MovieModel } from '@/models/movie.model';
import { MovieService } from '@/services/movie.service';
import axios from 'axios';
import { ref } from 'vue';


const movies = ref<MovieModel[]>();
MovieService.getMovies()
    .then(response => movies.value = response.data)


const actors = ref()
const search = ref({
    actor: 0
})
MovieService.getActors()
.then(response => actors.value = response.data)

</script>

<template>
    <h1>Home Page | Praktikum Sistemi E-Poslovanja</h1>

    <div class="row mb-3">
        <div class="col" v-if="actors">
            <select class="form-select" v-model="search.actor">
                <option :value="0">Choose an actor/actress:</option>
                <option v-for="a of actors" :value="a.actorId" selected>{{ a.name }}</option>
            </select>
        </div>
    </div>

    <div class="card-holder" v-if="movies">
        <div class="card movie-card" v-for="m of movies" :key="m.movieId">
            <img :src="m.poster" class="card-img-top" :alt="m.title">
            <div class="card-body">
                <h5 class="card-title">{{ m.title }}</h5>
                <p class="card-text">
                    {{ m.shortDescription }}
                </p>

            </div>
            <div class="card-footer">
                <RouterLink :to="`/movie/${m.shortUrl}`" class="btn btn-sm btn-info">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Details
                </RouterLink>
            </div>
        </div>
    </div>

    <!-- <p>Unos korisnika: </p>
    <pre>{{ search }}</pre>
    <label for="title">Enter title: </label>
    <input id="title" type="text" v-model="search.title" />
    <label for="actor">Enter actor: </label>
    <input id="actor" type="text" v-model="search.actor" />

    <p v-if="search.title !== ''">Pretraga naslova: {{ search.title }}</p>
    <p v-else>Niste uneli nista u polje pretrage naslova</p>
    <p v-if="search.actor !== ''">Pretraga glumca: {{ search.actor }}</p>
    <p v-else>Niste uneli nista u polje pretrage glumca</p> -->

</template>

<style>
.card-holder {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
}

.movie-card {
    width: 18rem;
    min-height: 200px;
}
</style>