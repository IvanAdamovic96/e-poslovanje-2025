<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { register } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const firstName = ref<string>('')
const lastName = ref<string>('')
const email = ref<string>('')
const phone = ref<string>('')
const password = ref<string>('')
const repeat = ref<string>('')




function doRegister() {
    if(firstName.value == '') return
    if(lastName.value == '') return
    if(email.value == '') return
    if(phone.value == '') return
    if(password.value == '') return
    if(repeat.value == '') return

    if(repeat.value !== password.value){
        alert('Passwords dont match')
        return
    }

    register({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        password: password.value
    })
    .then(rsp => router.push('/login'))
    .catch(e=> alert('Registration failed!'))
}

</script>

<template>
    <Navigation />
    <div class="auth mt-5">
        <h3 class="text-center">Sign Up</h3>
        <form v-on:submit.prevent="doRegister">
            <div class="mb-3">
                <label for="firstName" class="form-label">First Name:</label>
                <input type="text" class="form-control" id="firstName" v-model="firstName">
            </div>
            <div class="mb-3">
                <label for="lastName" class="form-label">Last Name:</label>
                <input type="text" class="form-control" id="LastName" v-model="lastName">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label">Phone: </label>
                <input type="text" class="form-control" id="phone" v-model="phone">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="mb-3">
                <label for="repeat" class="form-label">Repeat Password:</label>
                <input type="password" class="form-control" id="repeat" v-model="repeat">
            </div>

            <div class="btn-group">
                <button type="submit" class="btn btn-primary">
                    <i class="fa-solid fa-user-plus"></i> Sign Up
                </button>
                <RouterLink class="btn btn-outline-secondary" to="/register">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i> Already have an account.
                </RouterLink>
            </div>

        </form>
    </div>
</template>