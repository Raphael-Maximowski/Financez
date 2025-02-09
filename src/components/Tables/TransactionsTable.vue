<script setup lang="ts">
import TransactionCard from "@/components/Cards/TransactionCard.vue";
import {modalModule} from "@/stores/modalModule.ts";
import {useRoute} from "vue-router";
import {computed, onMounted, ref, watch} from "vue";
import {userDataModule} from "@/stores/userDataModule.ts";
import type {transactionDataInterface, transactionsFiltersInterface} from "@/typescript/DashBoard/interfaces.ts";

const modalManagement: any = modalModule()
const userDataManagement: any = userDataModule()
const transactionsData = computed<transactionDataInterface[]>(() => userDataManagement.transactionDataGetter)
const tableFilter = ref<transactionsFiltersInterface>({
  typeTransaction: 'expense',
  state: 'pendent'
})

const openTransactionsModal = (transactionToSetInModal: transactionDataInterface | undefined = undefined): void => {
  const modalPayload = {
    modalName: 'transactions',
    ...(transactionToSetInModal && { modalExtendedData: transactionToSetInModal })
  }

  modalManagement.handleModalState(modalPayload)
}
</script>

<template>
  <div class="px-4 d-flex flex-column h-100 bg-white rounded-2 table-container">
    <div class="table-header d-sm-flex justify-content-between align-items-center">
      <p class="py-2 m-0 fw-bold fs-5">Pendent Transactions</p>
      <button @click="() => openTransactionsModal()" type="button" class="mb-2 mb-sm-0  btn btn-dark py-1">
        Add Transaction <span class="ms-2">+</span>
      </button>
    </div>

    <div class="flex-grow-1">
      <TransactionCard
          v-for="transaction in transactionsData.filter(t =>
           t.transactionType === tableFilter.typeTransaction && t.transactionState === tableFilter.state)"
          :key="transaction.id"
          :transaction="transaction"
          @click="openTransactionsModal(transaction)" />
    </div>
  </div>
</template>

<style scoped>
.table-container {
  border: 1px solid lightgray;
  width: calc(100% - 15px);
}

.btn-dark {
  font-size: 14px;
}

.table-header {
  border-bottom: 1px solid lightgray;
}
</style>