<script lang="ts" setup>
import type { CinemaModel } from '@/models/cinema.model';
import { CinemaService } from '@/services/cinema.service';
import { ref } from 'vue';

const cinemas = ref<CinemaModel[]>()
CinemaService.getCinemas().then(rsp => {
    cinemas.value = rsp.data
})

</script>

<template>
    <h1>Cinemas</h1>
    <!-- <pre>{{ cinemas }}</pre> -->
    <table class="table table-striped table-hover" v-if="cinemas">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
                <th scope="col">Changed</th>
                <th scope="col">Options</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="c of cinemas">
                <th scope="row">{{ c.cinemaId }}</th>
                <td>{{ c.name }}</td>
                <td>{{ c.location }}</td>
                <td>{{ new Date(c.updatedAt ?? c.createdAt).toLocaleDateString('sr-RS') }}</td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/cinema/${c.cinemaId}`" class="btn btn-sm btn-success">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                    </div>
                    <button type="button" class="btn btn-sm btn-danger">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>