<script lang="ts" setup>
import { setTokens } from '@/auth';
import Navigation from '@/components/Navigation.vue';
import { login } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const email = ref<string>('')
const password = ref<string>('')
const route = useRoute()
const router = useRouter()

function doLogin() {
    if (email.value == '' || password.value == '') return

    login(email.value, password.value).then(rsp => {
        setTokens(rsp.data)
        if (route.query.r) {
            router.push(route.query.r as string)
            return
        }

        router.push('/')
    })
        .catch(e => alert('Login failed!'))
}

</script>

<template>
    <Navigation />
    <div class="auth mt-5">
        <h3 class="text-center">Login</h3>
        <form v-on:submit.prevent="doLogin">
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="btn-group">
                <button type="submit" class="btn btn-primary">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i> Login
                </button>
                <RouterLink class="btn btn-outline-secondary" to="/register">
                   <i class="fa-solid fa-user-plus"></i> Create an account
                </RouterLink>
            </div>

        </form>
    </div>
</template>