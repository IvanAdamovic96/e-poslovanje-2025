<script lang="ts" setup>
import { AuthService } from '@/services/auth.service';
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import type { BikeModel } from '@/models/bike.model';
import { BikeService } from '@/services/bike.service';
import { BookmarkService } from '@/services/bookmark.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLogout } from '@/hooks/logout.hooks';
import { showConfirm } from '@/utils';
import { UserService } from '@/services/user.service';


const logout = useLogout()
const router = useRouter()
/* const brands = ref('')

const filters = ref({
    brand: '',
    year: '',
});
const availableBrands = ref<string[]>([]); */

const bikes = ref<BikeModel[]>()



function loadBikes() {
    BikeService.getBikes()
        .then(rsp => bikes.value = rsp.data)
}

function addBookmark(bike: BikeModel) {
    showConfirm(`Add ${bike.brand + ` ` + bike.model} to bookmarks?`, () => {
        BookmarkService.createBookmark(bike.bikeId)
            .then(rsp => router.push('/user'))
            .catch((e) => logout(e))
    })
}

loadBikes()
</script>

<template>
    <Navigation />

    <div class="container p-lg-5" v-if="bikes">
        <div class="row mb-5">
            <div class="container" v-if="AuthService.getRefreshToken()">
                <RouterLink to="/bikes/new" class="btn btn-primary">Add new bike</RouterLink>
            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            <div v-for="bike of bikes" :key="bike.bikeId" class="col">
                <div class="card">
                    <img :src="bike.image" class="card-img-top p-3" :alt="bike.model">
                    <div class="card-body">
                        <h3 class="card-title">
                            <RouterLink :to="`/bikes/${bike.bikeId}`">
                                {{ bike.brand }} {{ bike.model }}
                            </RouterLink>
                        </h3>
                        <p class="card-text">{{ bike.description.substring(0, 100) }}...</p>
                        <p class="card-text">Year: {{ bike.year }}</p>
                        <p class="card-text">Displacement: {{ bike.displacement }} cc</p>
                        <h3><b>Price: </b> {{ bike.price }} €</h3>
                    </div>
                    <div class="card-footer">
                        <div class="btn-group">
                            <RouterLink :to="`/bikes/${bike.bikeId}`" class="btn btn-sm btn-outline-primary">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i> Details
                            </RouterLink>
                            <button type="button" class="btn btn-sm btn-outline-secondary"
                                v-if="AuthService.getRefreshToken()" @click="addBookmark(bike)">
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
}

.card-img-top {
    height: 200px;
    object-fit: cover;
}
</style>