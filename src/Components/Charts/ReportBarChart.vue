<script setup lang="ts">
import type { chartOptions } from "@/Typescript/Interfaces/ChartInterfaces";
import {computed, onMounted, ref, watch} from "vue";
import {Bar} from "vue-chartjs";
import type { BarChartInterface } from "@/Typescript/Interfaces/ChartInterfaces";

const props = defineProps<{
  dataSet: BarChartInterface
}>()

const dataSetReference = computed<any>(() => props.dataSet)
const options: chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <div v-if="dataSet" class="px-5 bart-chart-container w-100 flex-grow-1">
    <Bar :options="options" :data="dataSetReference"/>
  </div>
</template>

<style scoped>

</style>