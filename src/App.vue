<script setup lang="ts">
import Header from "@/Components/Headers/Header.vue";
import {userSettingsModule} from "@/Store/UserSettingsModule.ts";
import {computed, nextTick, onBeforeMount, onBeforeUnmount, onMounted, ref, watch} from "vue";
import TransactionsModal from "@/Components/Modals/TransactionManagementModal.vue";
import {modalModule} from "@/Store/ModalModule.ts";

const userSettingsManagement: any = userSettingsModule()
const modalManagement = modalModule()
const modalName = computed(() => modalManagement.modalNameGetter)

const setUserWidth = (): void => {
  userSettingsManagement.setUserWidth(window.innerWidth)
}

onBeforeMount(() => {
  window.addEventListener('resize', setUserWidth)
})

onBeforeUnmount((): void => {
  window.removeEventListener('resize', setUserWidth)
})
</script>

<template>
  <div class="px-5 pb-5 d-flex flex-column vw-100 vh-100">
    <Header/>
    <div class="pt-4 flex-grow-1">
      <RouterView/>
    </div>

  </div>

  <TransactionsModal v-if="modalName === 'TransactionsModal'"/>
</template>

<style scoped>

</style>