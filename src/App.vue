<script setup lang="ts">
import Header from "@/Components/Headers/Header.vue";
import {userSettingsModule} from "@/Store/UserSettingsModule.ts";
import {computed, nextTick, onBeforeMount, onBeforeUnmount, onMounted, ref, watch} from "vue";
import TransactionsModal from "@/Components/Modals/TransactionManagementModal.vue";
import ResetDataModal from "@/Components/Modals/ResetDataModal.vue";
import {modalModule} from "@/Store/ModalModule.ts";
import {transactionsModule} from "@/Store/TransactionsModule.ts";

const userSettingsManagement: any = userSettingsModule()
const modalManagement = modalModule()
const modalName = computed(() => modalManagement.modalNameGetter)
const transactionsMagement = transactionsModule()

const setUserWidth = (): void => {
  userSettingsManagement.setUserWidth(window.innerWidth) 
}

onBeforeMount(() => {
  window.addEventListener('resize', setUserWidth)
})

onBeforeUnmount((): void => {
  window.removeEventListener('resize', setUserWidth)
})

onMounted(() => {
  setUserWidth()
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
  <ResetDataModal v-if="modalName === 'ResetDataModal'"/>
</template>

<style scoped>

</style>