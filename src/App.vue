<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
const year = new Date().getFullYear()

</script>

<template>
  <div class="container">

    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">PSEP 2025</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/" exact-active-class="active">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/movieslist" exact-active-class="active">Movies</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about" exact-active-class="active">About</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <RouterView />

    <p class="text-center mt-5">&copy; {{ year }} Singidunum University - Praktikum: Sistemi E-poslovanja</p>
  </div>
</template>
