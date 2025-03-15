<script setup lang="ts">
import TransactionsMetricsDropDown from "@/Components/DropDowns/TransactionsMetricsDropDown.vue";
import TransactionsTables from "@/Components/Tables/TransactionsTables.vue";
import MetricsLine from "@/Components/Charts/MetricsLine.vue";
import MetricDoughnut from "@/Components/Charts/MetricDoughnut.vue";
import {chartsDataModule} from "@/Store/ChartsDataModule.ts";
import {computed, onMounted, watch} from "vue";
import {useRoute} from "vue-router";
import GoalCard from "@/Components/Card/GoalCard.vue";
import {savingsModule} from "@/Store/SavingsModule.ts";
import Goals from "@/Components/Field/Goals.vue";
import {transactionsDataModule} from "@/Store/TransactionsDataModule.ts";

const chartsModule = chartsDataModule()
const transactionsManagement = transactionsDataModule()
const chartsTransactions = computed(() => chartsModule.chartTransactionsGetter)
const chartsSettings = computed(() => chartsModule.chartConfigGetter)
const chartsLineDataSets = computed(() => chartsModule.chartConfigDataSetsGetter)
const route = useRoute()
const isInSavingsView = route.name === 'Savings View'
const goalsData = computed(() => transactionsManagement.goalsDataGetter)
</script>

<template>
  <div class="w-100 h-100 d-flex flex-column">
    <TransactionsMetricsDropDown />

    <div class="content-container d-xxl-flex  flex-grow-1 pt-4">
      <div class="d-flex flex-column left-container-content col-xxl-9 col-12 h-100">
        <div class="w-100 h-50">
          <MetricsLine
              :chartsTransactions="chartsTransactions"
              :chartConfig="chartsSettings"
              :chartsLineDataSets="chartsLineDataSets"
          />
        </div>
        <div class="table-container w-100 h-50">
          <TransactionsTables
              :chartsTransactions="chartsTransactions"
              :chartsSettings="chartsSettings"
          />
        </div>
      </div>
      <div class="col-xxl-3 col-12 h-100">
        <div v-if="!isInSavingsView" class="w-100 h-100 d-flex align-items-center justify-content-center ">
          <MetricDoughnut/>
        </div>
        <div v-else>
          <GoalCard v-for="goal in goalsData" :goal="goal"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.left-container-content {
  gap: 20px;
}

.content-container {
  height: 80vh;
}

.table-container {
  max-height: 100%;
}
</style>