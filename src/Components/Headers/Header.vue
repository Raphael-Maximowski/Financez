<script setup>
import {useRouter} from "vue-router";
import {modalModule} from "@/Store/ModalModule.ts";

const router = useRouter()
const date = new Date();
const modalManagement = modalModule()
const formattedDate = date.toLocaleDateString('en-US', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
}).replace(' ', ', ');

const redirectUser = () => {
  router.push({name: 'DashBoard View'})
}

const openRealModeModal = () => {
  modalManagement.setModalState({ name: 'ResetDataModal' })
}

</script>

<template>
  <div class="py-4 justify-content-between d-flex header-container w-100">
    <h1 @click="redirectUser" class="fw-bold m-0 fs-3">Financez</h1>
    <div class="d-flex gap-3">
      <p class="m-0">{{ formattedDate }}</p>
      <i @click="openRealModeModal" class="bi bi-gear-fill"></i>
    </div>
  </div>
</template>

<style scoped>
.bi-gear-fill {
  cursor: pointer;
}

h1 {
  cursor: pointer;
}

.header-container {
  border-bottom: 2px solid lightgray;
}
</style>