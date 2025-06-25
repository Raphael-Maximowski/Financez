<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import {chartsModule} from "@/Store/ChartsModule.ts";
import {computed, onMounted, watch} from "vue";

ChartJS.register(ArcElement, Tooltip, Legend)

const chartsManagement = chartsModule()
const doughnutDataSet = computed(() => chartsManagement.doughnutDataSetGetter)
const data = computed(() => (doughnutDataSet.value))
const readyToRenderChart = computed(() => {
  const dataSetLength = typeof doughnutDataSet.value === 'object' && doughnutDataSet?.value?.datasets
  ? doughnutDataSet?.value?.datasets.length
      : 0
  const labelsLength = typeof doughnutDataSet.value === 'object' && doughnutDataSet?.value?.labels
  ? doughnutDataSet?.value?.labels.length
      : 0

  return dataSetLength > 0 && labelsLength > 0
})
const options = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <div class="w-75 h-75">
    <Doughnut v-if="readyToRenderChart"  :data="data" :options="options" />
  </div>
</template>

<style scoped>

</style>