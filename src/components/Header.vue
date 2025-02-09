<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter()

const redirectToDashBoard = () => {
  router.push({ name: 'DashBoard View' })
}

const date = new Date();
const formattedDate = date.toLocaleDateString('en-US', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
}).replace(' ', ', ');

</script>

<template>
  <header class="w-100 d-flex align-items-center header-container d-flex justify-content-between">
    <h1 @click="redirectToDashBoard " class="fs-4 m-0 fw-bold">Financez</h1>
    <p class="m-0 fs-6">{{ formattedDate }}</p>
  </header>
</template>

<style scoped>
h1 {
  cursor: pointer;
}

.header-container {
  height: 8vh;
  border-bottom: 1px solid lightgray;
}
</style>