<script setup lang="ts">
import {convertToDateTime} from "@/utils/formatToDate.ts";
import {onMounted} from "vue";
const props = defineProps({
  transaction: { type: Object, required: true }
})
const negativeValue: boolean = props.transaction.transactionType === 'expense' ? true : false
</script>

<template>
  <div class="d-flex card-container mt-2 justify-content-between align-items-center">
    <div>
      <p class="m-0">{{ transaction.transactionTitle }}</p>
      <p class="m-0 small-text"> {{ transaction.transactionDate }} </p>
    </div>
    <p :class=" negativeValue ? 'text-danger' : 'text-success' , ['m-0']"> {{ negativeValue ? '-' : '+' }} U$ {{ transaction.transactionValue }}</p>
  </div>
</template>

<style scoped>
.card-container {
  cursor: pointer;
}

.small-text {
  font-size: 12px;
}
</style>