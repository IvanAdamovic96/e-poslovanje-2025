<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <RouterLink to="/">Home</RouterLink> | <RouterLink to="/about">About</RouterLink> | <a href="https://google.com" target="_blank">Google</a>
  <RouterView />
</template>


