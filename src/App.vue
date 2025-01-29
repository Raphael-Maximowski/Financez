<script setup lang="ts">
import Header from "@/components/Headers/Header.vue";
import {onBeforeUnmount, onMounted} from "vue";
import {userConfigStore} from "@/stores/userConfig.ts";

const userConfigManagement = userConfigStore()

const handleUserResize = () => {
  userConfigManagement.setUserConfigWidth(window.innerWidth)
}

onMounted(() => {
  window.addEventListener('resize', handleUserResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleUserResize)
})
</script>

<template>
  <div class="app-container overflow-y-auto d-flex flex-column vw-100 vh-100 px-5">
    <Header />
    <div class=" flex-grow-1  my-4">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  font-family: Poppins;
  background-color: rgba(211, 211, 211, 0.17);
}
</style>
