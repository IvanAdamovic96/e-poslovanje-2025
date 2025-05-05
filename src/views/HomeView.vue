<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';


const search = ref({
    title: '',
    actor: ''
})

</script>

<template>
    <h1>Home Page | Praktikum Sistemi E-Poslovanja</h1>
    <p>Unos korisnika: </p>
    <pre>{{ search }}</pre>
    <label for="title">Enter title: </label>
    <input id="title" type="text" v-model="search.title" />
    <label for="actor">Enter actor: </label>
    <input id="actor" type="text" v-model="search.actor" />

    <p v-if="search.title !== ''">Pretraga naslova: {{ search.title }}</p>
    <p v-else>Niste uneli nista u polje pretrage naslova</p>
    <p v-if="search.actor !== ''">Pretraga glumca: {{ search.actor }}</p>
    <p v-else>Niste uneli nista u polje pretrage glumca</p>
    
</template>
