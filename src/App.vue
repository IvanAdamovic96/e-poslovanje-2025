<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue';
const year = new Date().getFullYear()



</script>

<template>
  <div class="container mainpart">
    <RouterView />
    <footer class="text-lg-start">
      <p class="text-center mt-5">&copy; {{ year }} Singidunum University - Praktikum: Sistemi E-poslovanja</p>
    </footer>
  </div>
</template>
