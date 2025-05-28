<script lang="ts" setup>
import { ref, onMounted, renderSlot } from 'vue';
import Navigation from '@/components/Navigation.vue';
import Loading from '@/components/Loading.vue';
import { UserService } from '@/services/user.service';
import type { UserModel } from '@/models/user.model';
import { showConfirm, showError, showSuccess } from '@/utils';
import { useLogout } from '@/hooks/logout.hooks';
import router from '@/router';

const logout = useLogout()
const user = ref<UserModel | null>(null);
const loading = ref(true);
const newPassword = ref('');
const confirmNewPassword = ref('');

onMounted(async () => {
    await fetchUserProfile();
});

async function fetchUserProfile() {
    //loading.value = true;
    await UserService.getSelfUser()
        .then(res => user.value = res.data)
        .catch((e) => logout(e))

}

async function submitUpdate() {
    if (!user.value) {
        showError('User data not found!');
        return;
    }

    const payload: Partial<UserModel> = {
        firstName: user.value.firstName,
        lastName: user.value.lastName,
        email: user.value.email,
        phone: user.value.phone,
    };

    if (newPassword.value) {
        if (newPassword.value !== confirmNewPassword.value) {
            showError('Passwords dont match!');
            return;
        }
        payload.password = newPassword.value;
    }

    await UserService.updateUser(payload)
        /* .then(rsp => user.value = rsp.data) */
        .catch(e => showError(e))
    showSuccess('Successfuly edited profile')
    router.push('/user')

    newPassword.value = '';
    confirmNewPassword.value = '';
}
</script>

<template>
    <Navigation />
    <div class="container mt-4">
        <h1 class="mb-4">Moj profil</h1>

        <div v-if="user">
            <div class="card shadow-sm p-4">
                <form @submit.prevent="submitUpdate">
                    <div class="mb-3">
                        <label for="firstName" class="form-label">Ime</label>
                        <input type="text" class="form-control" id="firstName" v-model="user.firstName" required>
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">Prezime</label>
                        <input type="text" class="form-control" id="lastName" v-model="user.lastName" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email adresa</label>
                        <input type="email" class="form-control" id="email" v-model="user.email" required>
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Broj telefona</label>
                        <input type="tel" class="form-control" id="phone" v-model="user.phone">
                    </div>

                    <hr class="my-4">
                    <h4>Promena lozinke (opciono)</h4>
                    <div class="mb-3">
                        <label for="newPassword" class="form-label">Nova lozinka</label>
                        <input type="password" class="form-control" id="newPassword" v-model="newPassword">
                        <small class="form-text text-muted">Ostavite prazno ako ne želite da menjate lozinku.</small>
                    </div>
                    <div class="mb-3">
                        <label for="confirmNewPassword" class="form-label">Potvrdite novu lozinku</label>
                        <input type="password" class="form-control" id="confirmNewPassword"
                            v-model="confirmNewPassword">
                    </div>

                    <button type="submit" class="btn btn-primary mt-3">Sačuvaj promene</button>
                </form>
            </div>
        </div>
        <Loading v-else />


    </div>
</template>