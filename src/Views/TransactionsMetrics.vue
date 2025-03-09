<script setup lang="ts">
import TransactionsMetricsDropDown from "@/Components/DropDowns/TransactionsMetricsDropDown.vue";
import TransactionsTables from "@/Components/Tables/TransactionsTables.vue";
import MetricsLine from "@/Components/Charts/MetricsLine.vue";
import MetricDoughnut from "@/Components/Charts/MetricDoughnut.vue";
import {chartsDataModule} from "@/Store/ChartsDataModule.ts";
import {computed, onMounted, watch} from "vue";

const chartsModule = chartsDataModule()
const chartsTransactions = computed(() => chartsModule.chartTransactionsGetter)
const chartsSettings = computed(() => chartsModule.chartConfigGetter)
const chartsLineDataSets = computed(() => chartsModule.chartConfigDataSetsGetter)
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
      <div class="d-flex align-items-center justify-content-center col-xxl-3 col-12 h-100">
        <MetricDoughnut />
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