<script setup>
import { Chart as ChartJS, CategoryScale,  LinearScale,  PointElement,  LineElement,  Title,  Tooltip,  Legend } from 'chart.js'
import { Line } from 'vue-chartjs'
import {computed, onMounted} from "vue";
import {chartsDataModule} from "@/Store/ChartsDataModule.ts";
ChartJS.register( CategoryScale,  LinearScale,  PointElement,  LineElement,  Title,  Tooltip,  Legend )

const chartsManagement = chartsDataModule()
const lineDataSets = computed(() => chartsManagement.lineDataSetsGetter)
const lineLabels = computed(() => chartsManagement.lineLabelsGetter)

const chartSetup = computed(() => ({
  labels: lineLabels.value,
  datasets: lineDataSets.value
}))

const options = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <div class="w-100  h-100">
    <Line :data="chartSetup" :options="options" />
  </div>
</template>

<style scoped>

</style>