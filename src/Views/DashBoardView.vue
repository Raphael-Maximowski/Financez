<script setup>
import DashBoardCard from "@/Components/Cards/DashBoardCard.vue";
import TransactionsTables from "@/Components/Tables/TransactionsTables.vue";
import {computed, onMounted, watch} from "vue";
import {dashBoardModule} from "@/Store/DashBoardModule.ts";
import DashBoardDoughnut from "@/Components/Charts/DashboardDoughnutChart.vue";
import {chartsModule} from "@/Store/ChartsModule.ts";
import {transactionsModule} from "@/Store/TransactionsModule.ts";

const chartsManagement = chartsModule()
const transactionsManagement = transactionsModule()
const transactionsData = computed(() => transactionsManagement.transactionsDataGetter)
const dashBoardManagement = dashBoardModule()
const chartsTransactions = computed(() => chartsManagement.chartTransactionsGetter)

const checkDashBoardData = () => {
  dashBoardManagement.setDashBoardData()
}

onMounted(() => {
  checkDashBoardData()
})

watch(transactionsData, () => {
  checkDashBoardData()
}, { deep: true })
</script>

<template>
  <div class="d-flex flex-column w-100 h-100 ">
    <DashBoardCard />
    <div class="d-xl-flex flex-grow-1">
      <div class="col-xl-6 transaction-container pt-4 col-12">
        <TransactionsTables :chartsTransactions="chartsTransactions"/>
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