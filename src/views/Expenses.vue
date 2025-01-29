<script setup lang="ts">
import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { computed } from "vue";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const chartConfig = computed(() => ({
  data: {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: 'Vendas',
        data: [1500, 2300, 1100, 900, 2000, 2700],
        borderColor: '#DC3545',
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true
      }
    }
  }
}));
</script>

<template>
  <div class="h-100 w-100">
    <div class="w-100 h-50"> <!-- Define um tamanho fixo -->
      <Line :data="chartConfig.data" :options="chartConfig.options" />
    </div>
    <div class="bg-info h-50 w-100"></div>
  </div>
</template>
