<script lang="ts" setup>
import {Doughnut} from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import type {dashboardChartInterface} from "@/typescript/DashBoard/interfaces.ts";
import {userDataModule} from "@/stores/userDataModule.ts";
import {computed, onMounted, ref, watch} from "vue";
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);


const userDataManagement = userDataModule()
const transactionsData = computed(() => userDataManagement.transactionDataGetter)
const transactionsTimeRangeFilter = computed(() => userDataManagement.transactionsTimeRangeGetter)
const transactionsPendentData = ref(0)
const transactionsPaidData = ref(0)


const chartData: dashboardChartInterface = computed(() => ({
  labels: ['Pendent Expenses', 'Paid Expenses'],
  datasets: [
    {
      data: [transactionsPendentData.value, transactionsPaidData.value],
      backgroundColor: ['#DC3545', 'rgba(220,53,69,0.66)'],
    },
  ],
}))

const setChartDataValues = () => {
  transactionsPaidData.value = 0
  transactionsPendentData.value = 0

  transactionsData.value.forEach((transaction) => {
    if (transaction.transactionType === 'expense'
        && transaction.notFormatedTransactionDate >= transactionsTimeRangeFilter.value.startDate
        && transaction.notFormatedTransactionDate <= transactionsTimeRangeFilter.value.endDate
    ) {
      if (transaction.transactionState === 'pendent') {
        transactionsPendentData.value += transaction.transactionValue
        return
      }

      transactionsPaidData.value += transaction.transactionValue

    }
  })

  console.log("Paid Data: ", transactionsPaidData.value)
  console.log("Pendent Data: ", transactionsPendentData.value)
}

watch([transactionsTimeRangeFilter, transactionsData], () => {
  setChartDataValues()
})

onMounted(() => {
  setChartDataValues()
})
</script>

<template>
  <div class="mt-4 mt-xxl-0 col-10 w-100 h-100 d-flex align-items-center justify-content-center">
    <Doughnut :data="chartData" :options="{ responsive: true }"  />
  </div>
</template>

<style scoped>

</style>