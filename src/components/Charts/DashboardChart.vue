<script lang="ts" setup>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import type {dashboardChartInterface} from "@/typescript/DashBoard/interfaces.ts";
import {userDataModule} from "@/stores/userDataModule.ts";
import {computed, onMounted} from "vue";
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);


const userDataManagement = userDataModule()
const dashBoardData = computed(() => userDataManagement.dashBoardDataGetter)
const chartData: dashboardChartInterface = computed(() => ({
  labels: ['Income', 'Expense'],
  datasets: [
    {
      data: [dashBoardData.value[2].amount, dashBoardData.value[1].amount],
      backgroundColor: ['#28A745', '#DC3545'],
    },
  ],
}))

onMounted(() => {
  console.log(dashBoardData)

})

</script>

<template>
  <div class="col-xxl-6 col-9">
    <Doughnut :data="chartData" :options="{ responsive: true }"  />
  </div>
</template>

<style scoped>

</style>