<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import type { ActorModel } from '@/models/actor.model';
import type { DirectorModel } from '@/models/director.model';
import type { GenreModel } from '@/models/genre.model';
import type { MovieModel } from '@/models/movie.model';
import type { SearchModel } from '@/models/search.model';
import { MovieService } from '@/services/movie.service';
import axios from 'axios';
import { ref } from 'vue';


/* const movies = ref<MovieModel[]>();
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


loadMovies() */

</script>

<template>
    <Navigation />
    <h1>Home Page | Praktikum Sistemi E-Poslovanja</h1>

    <section class="mt-5 mb-5 d-flex justify-content-center align-items-center" id="sekcija">

        <div class="box">
            <span style="--i:1;"><img
                    src="https://www.bikesure.co.uk/bikesureblog/wp-content/uploads/2023/11/Triumph-Boneville-1024x674.webp"
                    alt="not found"></span>
            <span style="--i:2;"><img
                    src="https://www.carolenash.com/images/librariesprovider6/blog-posts/ktm-1390-super-adventure-evo.jpg?sfvrsn=cc92eb81_1"
                    alt="not found"></span>
            <span style="--i:3;"><img
                    src="https://www.bikesure.co.uk/bikesureblog/wp-content/uploads/2020/03/lexmoto-lxr-125-bike.png"
                    alt="not found"></span>
            <span style="--i:4;"><img
                    src="https://www.lamosmotorcycles.co.uk/wp-content/uploads/2024/07/Lamos-Motorbikes-for-sale-in-Pembrokeshire-Bike-01.webp"
                    alt="not found"></span>
            <span style="--i:5;"><img
                    src="https://compasscars.com.au/wp-content/uploads/2022/04/Prestige-Motorbike.png"
                    alt="not found"></span>
            <span style="--i:6;"><img src="https://misure.co.za/wp-content/uploads/2024/03/Blue-Suzuki-GSXR-Sunset-Photo-Motorbike-Insurance-MiSure.png"
                    alt="not found"></span>
            <span style="--i:7;"><img
                    src="https://www.scooter.co.uk/new_scooters/new/95-2.jpg"
                    alt="not found"></span>
            <span style="--i:8;"><img
                    src="https://donkeymotorbikes.com/wp-content/uploads/2022/01/Kawasaki-Ninja-H2R.jpg"
                    alt="not found"></span>
        </div>
    </section>








    <!-- Filters -->
    <!-- <div class="row">
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
    </div> -->
    <!-- / -->

    <!-- <div class="card-holder" v-if="movies && movies.length > 0">
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
    </div> -->



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





/* 
    slider
*/
#sekcija {
    padding-top: 100px;
    transform-style: preserve-3d;
    transform: rotateX(-12deg);

}



.box {
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
    animation: slid 40s linear infinite;
}



.box span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: center;
    transform-style: preserve-3d;
    transform: rotateY(calc(var(--i) * 45deg)) translateZ(350px);
}

.box span img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    transition: 2s;
}

.box span:hover img {
    transform: translateY(-30px) scale(1.2);
}

@keyframes slid {
    0% {
        transform: perspective(1000px) rotateY(0deg);
    }

    100% {
        transform: perspective(1000px) rotateY(360deg);
    }
}
</style>