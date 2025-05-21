<script lang="ts" setup>
import { getRefreshToken } from '@/auth';
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import type { BikeModel } from '@/models/bike.model';
import { BikeService } from '@/services/bike.service';
import { BookmarkService } from '@/services/bookmark.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


//const movies = ref<MovieModel[]>()
/* axios.get('https://movie.pequla.com/api/movie')
    .then(rsp => movies.value = rsp.data)
 */

const brands = ref('')

const filters = ref({
    brand: '',
    year: '',
});
const availableBrands = ref<string[]>([]);

/* BikeService.getBikeBrands()
    .then(rsp => availableBrands.value = rsp.data) */

//Ovde motore ucitati !!!!

const bikes = ref<BikeModel[]>()



function loadBikes() {
    BikeService.getBikes()
        .then(rsp => bikes.value = rsp.data)
}
const router = useRouter()
function addBookmark(bike: BikeModel) {
    if (!confirm(`Add ${bike.brand + ` ` + bike.model} to bookmarks?`)) return
    BookmarkService.createBookmark(bike.bikeId)
        .then(rsp => router.push('/user'))
        .catch(e => alert(e.message))
}

loadBikes()
</script>

<template>
    <Navigation />
    <!-- <div class="col-md-3">
        <label for="brandFilter" class="form-label">Brand:</label>
        <select v-model="filters.brand" id="brandFilter" class="form-select" @change="loadBikes">
            <option value="">All brands</option>
            <option v-for="brand in availableBrands" :key="brand" :value="brand">{{ brand }}</option>
        </select>
    </div> -->
    <div class="container">
        <RouterLink to="/bikes/new" class="btn btn-primary">Add new bike</RouterLink>
    </div>

    <div class="container p-lg-5" v-if="bikes">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            <div v-for="bike in bikes" :key="bike.bikeId" class="col">
                <div class="card">
                    <img :src="bike.image" class="card-img-top p-3" :alt="bike.model">
                    <div class="card-body">

                        <h3 class="card-title">
                            <RouterLink :to="`/bikes/${bike.bikeId}`">
                                {{ bike.brand }} {{ bike.model }}
                            </RouterLink>
                        </h3>
                        <p class="card-text">{{ bike.description.substring(0, 100) }}...</p>
                        <p class="card-text text-end"><b>Price:</b> {{ bike.price }} €</p>

                    </div>
                    <div class="card-footer">
                        <div class="btn-group">
                            <RouterLink :to="`/bikes/${bike.bikeId}`" class="btn btn-sm btn-outline-primary">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i> Details
                            </RouterLink>
                            <button type="button" class="btn btn-sm btn-outline-secondary" v-if="getRefreshToken()"
                                @click="addBookmark(bike)">
                                <i class="fa-solid fa-bookmark"></i> Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Loading v-else></Loading>
</template>




<style scoped>
.card {
    height: 100%;
    /* Obezbeđuje da sve kartice u redu budu iste visine */
}

.card-img-top {
    height: 200px;
    /* Podesi željenu visinu slike */
    object-fit: cover;
    /* Obezbeđuje da slika popuni prostor bez izobličenja */
}
</style>