<script setup lang="ts">
import {transactionsModule} from "@/Store/TransactionsModule.ts";
import type { SavingTransactionInterface, TransactionInterface } from "@/Typescript/Interfaces/TransactionsInterface.ts";

const props = defineProps<{
  transaction: TransactionInterface | SavingTransactionInterface
}>()

const transactionsManagement = transactionsModule()

const transactionColor = (): string | undefined => {
  switch (props?.transaction?.type) {
    case 'Income':
      return 'text-success'
    case 'Expense':
      return 'text-danger'
    case 'Saving':
      return 'text-dark'
  }
}

const changeTransactionState = (): void => {
  transactionsManagement.setTransactionsAsPaid(props?.transaction?.id || 0, props?.transaction?.type || '')
}
</script>

<template>
  <div class="gap-3 align-items-center transaction-card justify-content-between  w-100 bg-white py-3 d-flex">
    <div class="gap-3 align-items-center flex-grow-1 d-flex">
      <div class="transaction-data">
        <p class="mb-0">{{ transaction.name }}</p>
        <p class="mb-0 small-letters text-secondary">{{ transaction.date }}</p>
      </div>
      <p class="m-0">
        <i v-if="props.transaction.state === 'Pendent'" @click.stop="changeTransactionState" class="bi bi-check2-circle fs-6"></i>
      </p>
    </div>
    <p :class="[ transactionColor(), 'mb-0']">U$ {{ transaction.value }}</p>
  </div>
</template>

<style scoped>
.transaction-data {
  min-width: 100px;
}

.bi-check2-all {
  cursor: pointer;
}

.transaction-card {
  cursor: pointer;
  border-bottom: 1px solid lightgray;
}

.small-letters {
  font-size: 12px;
}
</style>