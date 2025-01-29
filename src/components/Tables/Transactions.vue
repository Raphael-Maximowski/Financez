<script lang="ts" setup>

import TransactionsCard from "@/components/Cards/TransactionsCard.vue";
</script>

<template>
  <div class="table-header  w-100">
    <h5 class="m-0 py-3 fw-bold">Last Transactions</h5>
    <div class="position-absolute"></div>
  </div>

  <div class=" table-body">
    <TransactionsCard />
    <TransactionsCard />
  </div>
</template>

<style scoped>
.table-header {
  border-bottom: 1px solid lightgray;
}

</style>