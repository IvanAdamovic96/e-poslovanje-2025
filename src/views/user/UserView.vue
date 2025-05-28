<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hooks';
import type { BookmarkModel } from '@/models/bookmark.model';
import type { UserModel } from '@/models/user.model';
import { BookmarkService } from '@/services/bookmark.service';
import { UserService } from '@/services/user.service';
import { formatDate, showConfirm } from '@/utils';
import { ref } from 'vue';

const user = ref<UserModel>()
const logout = useLogout()

UserService.getSelfUser()
    .then(rsp => user.value = rsp.data)
    .catch(e => logout(e))

function deleteBookmark(model: BookmarkModel) {
    showConfirm(`Delete saved bike ${model.bike.model}?`, () => {
        BookmarkService.deleteBookmark(model.bookmarkId)
            .then(rsp => {
                if (user.value == null) return
                user.value!.bookmarks = user.value?.bookmarks.filter(b =>
                    b.bookmarkId !== model.bookmarkId
                )
            })
            .catch(e => logout(e))
    })



    /* useAxios(`/bookmark/${model.bookmarkId}`, 'delete')
        .then(rsp => {
            if (user.value == null) return
            user.value!.bookmarks = user.value?.bookmarks.filter(b =>
                b.bookmarkId !== model.bookmarkId
            )
        })
        .catch(e => logout()) */
}
</script>
<template>
    <Navigation />

    <div class="row mt-3" v-if="user">
        <div class="col-12 col-md-9 mt-4 mb-5">
            <h3>User Account</h3>
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <th scope="row">First name:</th>
                        <td>{{ user.firstName }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Last name:</th>
                        <td>{{ user.lastName }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Email:</th>
                        <td>{{ user.email }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Phone number:</th>
                        <td>{{ user.phone }}</td>
                    </tr>
                </tbody>
            </table>
            <RouterLink to="/reservation" class="btn btn-info me-1">
                <i class="fa-regular fa-rectangle-list"></i> My reservations
            </RouterLink>
            <RouterLink to="/user/edit" class="btn btn-outline-secondary me-1">
                <i class="fa-regular fa-rectangle-list"></i> Edit profile
            </RouterLink>
        </div>
        <h5><strong>Saved bikes:</strong></h5>
        <table class="table table-striped table-hover">
            <thead>
                <tr class="text-center">
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Model</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Year</th>
                    <th scope="col">Saved at</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="user.bookmarks.length > 0" v-for="b of user.bookmarks" class="text-center">
                    <th scope="row">{{ b.bookmarkId }}</th>
                    <td>
                        <RouterLink :to="`/bikes/${b.bikeId}`">
                            <img :src="b.bike.image" alt="Bike" style="width: auto; height: 50px;" class="rounded">
                        </RouterLink>
                    </td>
                    <td>{{ b.bike.brand }}</td>
                    <td>{{ b.bike.model }}</td>
                    <td>{{ b.bike.category }}</td>
                    <td>{{ b.bike.price }}</td>
                    <td>{{ b.bike.year }}</td>
                    <td>{{ formatDate(b.createdAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink :to="`/bikes/${b.bikeId}`" class="btn btn-sm btn-primary me-1">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </RouterLink>
                            <button type="button" class="btn btn-sm btn-danger" @click="deleteBookmark(b)">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr v-else>
                    <td colspan="9">You dont have any bikes saved!</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>