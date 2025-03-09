<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const date = new Date();
const formattedDate = date.toLocaleDateString('en-US', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
}).replace(' ', ', ');

const redirectUser = () => {
  router.push({name: 'DashBoard View'})
}

</script>

<template>
  <div class="py-4 justify-content-between d-flex header-container w-100">
    <h1 @click="redirectUser" class="fw-bold m-0 fs-3">Financez</h1>
    <p class="m-0">{{ formattedDate }}</p>
  </div>
</template>

<style scoped>
h1 {
  cursor: pointer;
}

.header-container {
  border-bottom: 2px solid lightgray;
}
</style>