<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {transactionsModule} from "@/Store/TransactionsModule.ts";
import {handleTimeRange} from "@/Utils/formatters.ts";

const route = useRoute()
const router = useRouter()
const transactionsManagement = transactionsModule()
const typeMetrics = ref<string>()
const timeRange = ref<string>('week')

const setActualRoute = (): void => {
  typeMetrics.value =  typeof route.params.typeTransaction === 'string' ? route.params.typeTransaction : 'savings'
}

const redirectUser = (routeParam: string): void => {
  if (routeParam === 'savings') {
    router.push({ name: 'Savings View' })
    return
  }
  router.push({name: 'Metrics View', params: {typeTransaction: routeParam}})
}

const setTimeRange = (timeRange: string): void => {
  transactionsManagement.setTimeRange(handleTimeRange(timeRange))
}

onMounted((): void => {
  setActualRoute()
  setTimeRange(timeRange.value)
})

watch(timeRange, (newValue: string): void => {
  setTimeRange(newValue)
})

watch(typeMetrics, (newValue: string | undefined): void => {
  newValue && (redirectUser(newValue))
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
        <option value="savings">Savings</option>
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