<script setup lang="ts">
import { Chart as ChartJS, CategoryScale,  LinearScale,  PointElement,  LineElement,  Title,  Tooltip,  Legend } from 'chart.js'
import { Line } from 'vue-chartjs'
import {computed, onMounted} from "vue";
import {chartsModule} from "@/Store/ChartsModule.ts";
import type { chartOptions, lineChartDataSetInterface, LineChartInterface } from '@/Typescript/Interfaces/ChartInterfaces';
ChartJS.register( CategoryScale,  LinearScale,  PointElement,  LineElement,  Title,  Tooltip,  Legend )

const chartsManagement = chartsModule()
const lineDataSets = computed<lineChartDataSetInterface[]>(() => chartsManagement.lineDataSetsGetter)
const lineLabels = computed<string[]>(() => chartsManagement.lineLabelsGetter)
const readyToRenderChart = computed<Boolean>(() => {
  const labelKeys = typeof chartSetup.value.labels === 'object' ?
      Object.keys(chartSetup.value.labels)
      : []
  const arrayLength = Array.isArray(chartSetup?.value?.datasets) ?
      chartSetup.value.datasets.length
      : 0
  return Boolean(labelKeys.length !== 0 && arrayLength !== 0)
})
const chartSetup = computed<LineChartInterface>(() => ({
  labels: lineLabels.value,
  datasets: lineDataSets.value
}))


const options: chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <div class="w-100  h-100">
    <Line v-if="readyToRenderChart" :data="chartSetup" :options="options" />
  </div>
</template>

<style scoped>

</style>