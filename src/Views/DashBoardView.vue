<script setup lang="ts">
import DashBoardCard from "@/Components/Cards/DashBoardCard.vue";
import TransactionsTables from "@/Components/Tables/TransactionsTables.vue";
import {computed, onMounted, watch} from "vue";
import {dashBoardModule} from "@/Store/DashBoardModule.ts";
import DashBoardDoughnut from "@/Components/Charts/DashboardDoughnutChart.vue";
import {chartsModule} from "@/Store/ChartsModule.ts";
import {transactionsModule} from "@/Store/TransactionsModule.ts";
import {handleTimeRange} from "@/Utils/formatters.ts";
import type { TransactionInterface } from "@/Typescript/Interfaces/TransactionsInterface";

const chartsManagement = chartsModule()
const dashBoardManagement = dashBoardModule()
const transactionsManagement = transactionsModule()
const expensesData = computed<TransactionInterface[]>(() => transactionsManagement.expensesDataGetter.filter((t) => t.state === 'Pendent'))
const shouldCalculateDashboardData = computed<Boolean>(() => transactionsManagement.shouldCalculateDashboardDataGetters)

const checkDashBoardData = (): void => {
  dashBoardManagement.setDashBoardData()
}

const setMonthTimeRange = ():  void => {
  transactionsManagement.setTimeRange(handleTimeRange('month'))
}

const setTableData = (): void => {
  chartsManagement.setTableTitle("Pendent Transactions")
  chartsManagement.setTransactionsTableData(expensesData.value)
}

const resetShouldCalculateDashboardData = (): void => {
  transactionsManagement.setShouldCalculateDashboardData(false)
}

const calculateDashboardData = async (): Promise<void> => {
  await checkDashBoardData()
  await setTableData()
  await resetShouldCalculateDashboardData()
}

onMounted(async (): Promise<void> => {
  await setMonthTimeRange()
  await calculateDashboardData()
})

watch(shouldCalculateDashboardData, (newState: Boolean): void => {
  if (newState) {
    calculateDashboardData()
  }
})
</script>

<template>
  <div class="d-flex flex-column w-100 h-100 ">
    <DashBoardCard />
    <div class="d-xl-flex flex-grow-1">
      <div class="col-xl-6 transaction-container pt-4 col-12">
        <TransactionsTables/>
      </div>
      <div class="d-flex align-items-center justify-content-center col-xl-6 col-12 doughnut-container">
        <DashBoardDoughnut />
      </div>
    </div>
  </div>
</template>

<style scoped>
.transaction-container {
  height: 75vh;
}

.doughnut-container {
  height: 100%;
}

@media(max-width: 1200px) {
  .doughnut-container {
    height: 50%;
  }
}
</style>