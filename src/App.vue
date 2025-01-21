<script setup lang="ts">
import Header from "@/components/Headers/Header.vue";
</script>

<template>
  <div style="font-family: var(--font-poppins)"
       class="d-flex flex-column body-component vw-100 vh-100">
    <Header />
    <RouterView />
  </div>
</template>

<style scoped>
.body-component {
  background-color: #2b2b2b;
}
</style>
