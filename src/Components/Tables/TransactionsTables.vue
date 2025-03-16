<script setup lang="ts">
import TransactionCard from "@/Components/Card/TransactionCard.vue";
import {modalManagementModule} from "@/Store/ModalManagementModule.ts";
import {transactionsDataModule} from "@/Store/TransactionsDataModule.ts";
import {computed, watch} from "vue";
import {chartsDataModule} from "@/Store/ChartsDataModule.ts";

const modalManagement = modalManagementModule()
const chartManagement = chartsDataModule()
const transactionsData = computed(() => chartManagement.tableTransactionsGetter)
const tableTitle = computed(() => chartManagement.tableTitleGetter)

const openTransactionModal = (transactionData = null):void => {
  const modalPayload = {
    state: true,
    name: 'TransactionsModal',
    ...(transactionData && {extraData: transactionData})
  }
  modalManagement.setModalState(modalPayload)
}
</script>

<template>
  <div class="d-flex bg-white flex-column table-wrapper rounded-1 w-100 h-100">
    <div class="mx-4 d-flex align-items-center justify-content-between table-header py-3">
      <p class="m-0 fs-5 fw-bold">{{ tableTitle }}</p>
      <button @click="openTransactionModal(null)" class="btn btn-dark">Create Transaction</button>
    </div>
    <div class="px-4 flex-grow-1 custom-side-bar overflow-y-auto">
      <TransactionCard
          v-for="(transaction, index) in transactionsData"
          :key="index"
          :transaction="transaction"
          @click="openTransactionModal(transaction)"
      />
    </div>
  </div>
</template>

<style scoped>
.table-header {
  border-bottom: 1px solid lightgray;
}

.table-wrapper {
  border: 1px solid lightgray;
  max-height: 100%;
}
</style>