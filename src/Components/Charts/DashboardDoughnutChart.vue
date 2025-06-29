<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import {dashBoardModule} from "@/Store/DashBoardModule.ts";
import {computed, onMounted} from "vue";
ChartJS.register(ArcElement, Tooltip, Legend)

const dashBoardManagement = dashBoardModule()
const dashBoardData = computed(() => dashBoardManagement.dashboardDataGetter)
const chartReadyToRender = computed(() => {
  const incomeValue = Array.isArray(dashBoardData.value) && dashBoardData.value[1] && dashBoardData.value[1].value
  const expenseValue = Array.isArray(dashBoardData.value) && dashBoardData.value[2] && dashBoardData.value[2].value
  return incomeValue && expenseValue
})

const data = computed(() => ({
  labels: ['Income', 'Expense'],
  datasets: [
    {
      backgroundColor: ['#28A745', '#DD1B16'],
      data: [dashBoardData.value[1].value, dashBoardData.value[2].value]
    }
  ]
}))

const options = {
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