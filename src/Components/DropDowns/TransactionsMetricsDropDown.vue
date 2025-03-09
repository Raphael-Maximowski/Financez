<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {transactionsDataModule} from "@/Store/TransactionsDataModule.ts";
import {handleTimeRange} from "@/Utils/relatedToTimeFunctions.ts";

const route = useRoute()
const router = useRouter()
const typeMetrics = ref()
const transactionsManagement = transactionsDataModule()
const timeRange = ref('week')

const setActualRoute = () => {
  typeMetrics.value = route.params.typeTransaction
}

const redirectUser = (routeParam) => {
  router.push({name: 'Metrics View', params: {typeTransaction: routeParam}})
}

const setTimeRange = (timeRange) => {
  transactionsManagement.setTimeRange(handleTimeRange(timeRange))
}

onMounted(() => {
  setActualRoute()
  setTimeRange(timeRange.value)
})

watch(timeRange, (newValue) => {
  setTimeRange(newValue)
})

watch(typeMetrics, (newValue) => {
  redirectUser(newValue)
})
</script>

<template>
  <div class="d-flex align-items-center">
    <div class="select-container">
      <label class="mb-2">Type Metrics</label>
      <select v-model="typeMetrics" class="form-select">
        <option value="total-balance">Total Balance</option>
        <option value="expenses">Expenses</option>
        <option value="incomes">Incomes</option>
      </select>
    </div>

    <div class="ms-3 select-container">
      <label class="mb-2">Time Range</label>
      <select v-model="timeRange" class="form-select">
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.select-container {
  width: 200px;
}
</style>