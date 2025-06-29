<script setup lang="ts">
import TransactionCard from "@/Components/Cards/TransactionCard.vue";
import {modalModule} from "@/Store/ModalModule.ts";
import {transactionsModule} from "@/Store/TransactionsModule.ts";
import {computed, watch} from "vue";
import {chartsModule} from "@/Store/ChartsModule.ts";
import {useRoute} from "vue-router";
import InvestmentModal from "@/Components/Modals/InvestmentManagementModal.vue";

const modalManagement = modalModule()
const route = useRoute()
const chartManagement = chartsModule()
const transactionsData = computed(() => chartManagement.tableTransactionsGetter)
const tableTitle = computed(() => chartManagement.tableTitleGetter)


const openModal = (actionData = null) => {
  route.name === 'Savings View' ?
      openInvestmentModal(actionData)
      : openTransactionModal(actionData)
}

const openInvestmentModal = (investmentData = null) => {
  const modalPayload = {
    state: true,
    name: 'Investment Modal',
    ...investmentData && { extraData: investmentData }
  }

  modalManagement.setModalState(modalPayload)
}

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
      <button @click="openModal(null)" class="btn btn-dark">{{
          route.name === 'Savings View' ?
          'Register Investment'
          : 'Create Transaction' }}</button>
    </div>
    <div class="px-4 flex-grow-1 custom-side-bar overflow-y-auto">
      <div v-if="Array.isArray(transactionsData) && transactionsData.length > 0">
        <TransactionCard
            v-for="(transaction, index) in transactionsData"
            :key="index"
            :transaction="transaction"
            @click="openModal(transaction)"
        />
      </div>
      <div v-else class="d-flex empty-content gap-3 justify-content-center align-items-center w-100 h-100 ">
        <i class="bi bi-ban"></i> <p class="mb-0">No transactions found in this period</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.empty-content {
  color: gray;
}

.table-header {
  border-bottom: 1px solid lightgray;
}

.table-wrapper {
  border: 1px solid lightgray;
  max-height: 100%;
}
</style>