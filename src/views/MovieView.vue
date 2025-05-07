<script lang="ts" setup>
import type { MovieModel } from '@/models/movie.model';
import { MovieService } from '@/services/movie.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
//const link = route.params.link

const movie = ref<MovieModel>();
MovieService.getMovieByShortUrl(route.params.link as string)
    .then(rsp => movie.value = rsp.data)

</script>

<template>
    <div class="pt-5" v-if="movie">
        <div class="row mt-3">
            <div class="col-12 col-md-3">
                <img :src="movie?.poster" :alt="movie?.title" class="img-fluid rounded mb-3">
            </div>
            <div class="col-12 col-md-9">
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row">Title:</th>
                            <td>{{ movie.title }} | {{ movie.originalTitle }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Director:</th>
                            <td>{{ movie.director.name }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Description:</th>
                            <td>{{ movie.description }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Start Date:</th>
                            <td>{{ movie.startDate }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Run Time:</th>
                            <td>{{ movie.runTime }} min</td>
                        </tr>
                        <tr>
                            <th scope="row">Updated at:</th>
                            <td>{{ movie.updatedAt ?? movie.createdAt }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12 col-md-6">
                <h3>Actors:</h3>
                <ul class="list-group">
                    <li class="list-group-item" v-for="a of movie.movieActors">{{ a.actor.name }}</li>

                </ul>
            </div>
            <div class="col-12 col-md-6">
                <h3>Genres:</h3>
                <ul class="list-group">
                    <li class="list-group-item" v-for="g of movie.movieGenres">{{ g.genre.name }}</li>
                </ul>
            </div>
        </div>
    </div>

    <div v-else>Loading...</div>
</template>