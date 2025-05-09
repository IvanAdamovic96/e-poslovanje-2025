<script setup lang="ts">
import type { ActorModel } from '@/models/actor.model';
import type { DirectorModel } from '@/models/director.model';
import type { GenreModel } from '@/models/genre.model';
import type { MovieModel } from '@/models/movie.model';
import type { SearchModel } from '@/models/search.model';
import { MovieService } from '@/services/movie.service';
import axios from 'axios';
import { ref } from 'vue';


const movies = ref<MovieModel[]>();
const actors = ref<ActorModel[]>()
const genres = ref<GenreModel[]>()
const directors = ref<DirectorModel[]>()
const search = ref<SearchModel>({
    actor: 0,
    genre: 0,
    director: 0
})




MovieService.getActors()
    .then(response => actors.value = response.data)

MovieService.getGenres()
    .then(response => genres.value = response.data)

MovieService.getDirectores()
    .then(response => directors.value = response.data)



function loadMovies() {
    MovieService.getMovies(search.value)
        .then(response => movies.value = response.data)
}


loadMovies()

</script>

<template>
    <h1>Home Page | Praktikum Sistemi E-Poslovanja</h1>
    <!-- Filters -->
    <div class="row">
        <div class="col-12 col-md-4 mb-3" v-if="actors">
            <select class="form-select" v-model="search.actor" @change="loadMovies">
                <option :value="0">Choose an actor/actress:</option>
                <option v-for="a of actors" :value="a.actorId" selected>{{ a.name }}</option>
            </select>
        </div>
        <div class="col-12 col-md-4 mb-3" v-if="genres">
            <select class="form-select" v-model="search.genre" @change="loadMovies">
                <option :value="0">Choose genre:</option>
                <option v-for="g of genres" :value="g.genreId" selected>{{ g.name }}</option>
            </select>
        </div>
        <div class="col-12 col-md-4 mb-3" v-if="directors">
            <select class="form-select" v-model="search.director" @change="loadMovies">
                <option :value="0">Choose director:</option>
                <option v-for="d of directors" :value="d.directorId" selected>{{ d.name }}</option>
            </select>
        </div>
    </div>
    <!-- / -->

    <div class="card-holder" v-if="movies && movies.length > 0">
        <div class="card movie-card" v-for="m of movies" :key="m.movieId">
            <img :src="m.poster" class="card-img-top" :alt="m.title">
            <div class="card-body">
                <h5 class="card-title">{{ m.title }}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">{{ m.director.name }}</h6>
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
    <div class="text-center" v-else-if="movies">
        No movies
    </div>
    <div class="text-center" v-else="">
        Loading movies...
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