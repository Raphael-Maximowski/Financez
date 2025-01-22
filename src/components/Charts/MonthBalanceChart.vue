<script lang="ts" setup>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const chartData = {
  labels: ['Income', 'Expense'],
  datasets: [
    {
      data: [2200, 1100],
      backgroundColor: ['#28A745', '#DC3545'],
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Income vs Expense',
    },
  },
};
</script>

<template>
  <div>
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped></style>
