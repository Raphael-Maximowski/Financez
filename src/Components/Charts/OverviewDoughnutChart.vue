<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import {chartsModule} from "@/Store/ChartsModule.ts";
import {computed, onMounted} from "vue";

ChartJS.register(ArcElement, Tooltip, Legend)

const chartsManagement = chartsModule()
const doughnutDataSet = computed(() => chartsManagement.doughnutDataSetGetter)
const data = computed(() => (doughnutDataSet.value))
const options = {
  responsive: true,
  maintainAspectRatio: false
}

</script>

<template>
  <div class="w-75 h-75">
    <Doughnut :data="data" :options="options" />
  </div>
</template>

<style scoped>

</style>