<script setup>
import DashBoardCard from "@/Cards/DashBoardCard.vue";
import TransactionsTables from "@/Components/Tables/TransactionsTables.vue";
import {computed, onMounted, watch} from "vue";
import {dashBoardModule} from "@/Store/DashBoardModule.ts";
import DashBoardDoughnut from "@/Components/Charts/DashBoardDoughnut.vue";
import {chartsDataModule} from "@/Store/ChartsDataModule.ts";
import {transactionsDataModule} from "@/Store/TransactionsDataModule.ts";

const chartsManagement = chartsDataModule()
const transactionsManagement = transactionsDataModule()
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
  height: 80vh;
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