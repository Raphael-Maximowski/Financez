<script setup lang="ts">

import {transactionsDataModule} from "@/Store/TransactionsDataModule.ts";

const transactionsManagement = transactionsDataModule()

const props = defineProps({
  transaction: { type: Object, required: true }
})

const changeTransactionState = () => {
  transactionsManagement.setTransactionsAsPaid(props.transaction.id, props.transaction.type)
}


</script>

<template>
  <div class="align-items-center transaction-card justify-content-between  w-100 bg-white py-3 d-flex">
    <div class="align-items-center d-flex">
      <div>
        <p class="mb-0">{{ transaction.name }}</p>
        <p class="mb-0 small-letters text-secondary">{{ transaction.date }}</p>
      </div>
      <p class="m-0 ms-3">
        <i v-if="props.transaction.state === 'Pendent'" @click.stop="changeTransactionState" class="bi bi-check2-circle fs-6"></i>
      </p>
    </div>
    <p :class="[ transaction.type === 'Expense' ? 'text-danger' : 'text-success', 'mb-0']">U$ {{ transaction.value }}</p>
  </div>
</template>

<style scoped>
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