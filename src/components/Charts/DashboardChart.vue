<script lang="ts" setup>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import type {dashboardChartInterface} from "@/typescript/DashBoard/interfaces.ts";
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const chartData: dashboardChartInterface = {
  labels: ['Income', 'Expense'],
  datasets: [
    {
      data: [2200, 1100],
      backgroundColor: ['#28A745', '#DC3545'],
    },
  ],
};

</script>

<template>
  <div class="col-xxl-6 col-9">
    <Doughnut :data="chartData" :options="{ responsive: true }"  />
  </div>
</template>

<style scoped>

</style>