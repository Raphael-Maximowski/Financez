<script lang="ts" setup>
import Header from "@/components/Header.vue";
import TransactionModal from "@/components/Modals/TransactionModal.vue";
import {modalModule} from "@/stores/modalModule.ts";
</script>

<template>
  <div class="vw-100 px-4 vh-100 overflow-y-auto wrapper-container">
    <Header />
    <div class="w-100 py-4 content-container">
      <RouterView />
    </div>
  </div>

  <TransactionModal/>
</template>

<style scoped>
.wrapper-container {
  background-color: rgba(211, 211, 211, 0.1);
  font-family: Poppins;
}

.content-container {
  height: 92vh;
}
</style>