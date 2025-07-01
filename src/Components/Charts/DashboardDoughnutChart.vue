<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import {dashBoardModule} from "@/Store/DashBoardModule.ts";
import {computed, onMounted} from "vue";
import type { dashBoardDataInterface } from '@/Typescript/Interfaces/DashBoardInterfaces';
import type { DoughnutChartInterface, chartOptions } from '@/Typescript/Interfaces/ChartInterfaces';
ChartJS.register(ArcElement, Tooltip, Legend)

const dashBoardManagement = dashBoardModule()
const dashBoardData = computed<dashBoardDataInterface[]>(() => dashBoardManagement.dashboardDataGetter)
const chartReadyToRender = computed<boolean>((): boolean => {
  const incomeValue = Array.isArray(dashBoardData.value) && dashBoardData.value[1] && dashBoardData.value[1].value
  const expenseValue = Array.isArray(dashBoardData.value) && dashBoardData.value[2] && dashBoardData.value[2].value
  return Boolean(incomeValue && expenseValue)
})

const data = computed<any>(() => ({
  labels: ['Income', 'Expense'],
  datasets: [
    {
      backgroundColor: ['#28A745', '#DD1B16'],
      data: [dashBoardData.value[1].value, dashBoardData.value[2].value]
    }
  ]
}))

const options: chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <div class="w-75 h-75">
    <Doughnut v-if="chartReadyToRender" class="w-100 h-100" :data="data" :options="options" />
  </div>
</template>

<style scoped>

</style>