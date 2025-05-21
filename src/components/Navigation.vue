<script lang="ts" setup>
import { getRefreshToken, getUserEmail } from '@/auth';
import { useLogout } from '@/hooks/logout.hooks';

const logout = useLogout()

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">BIKE SHOP</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/" exact-active-class="active">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/bikes" exact-active-class="active">Bikes</RouterLink>
                    </li>
                    <!-- <li class="nav-item">
                        <RouterLink class="nav-link" to="/cinema" exact-active-class="active">Cinemas</RouterLink>
                    </li> -->
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about" exact-active-class="active">About</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/contact" exact-active-class="active">Contact Us</RouterLink>
                    </li>
                </ul>
                <template v-if="getRefreshToken()">
                    <div class="dropdown">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <span class="" v-if="getRefreshToken()">
                                <i class="fa-solid fa-user"></i> {{ getUserEmail() }}
                            </span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><RouterLink class="dropdown-item" to="/user">My Profile</RouterLink></li>
                            <li><button type="button" class="dropdown-item" @click="logout">Logout</button></li>
                        </ul>
                    </div>
                </template>
                <template v-else>
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/login" exact-active-class="active">
                                Login
                            </RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/register" exact-active-class="active">
                                Sign Up
                            </RouterLink>
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    </nav>
</template>