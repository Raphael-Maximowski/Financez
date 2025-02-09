<script lang="ts" setup>
import {Doughnut} from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import type {dashboardChartInterface} from "@/typescript/DashBoard/interfaces.ts";
import {userDataModule} from "@/stores/userDataModule.ts";
import {computed, onMounted, ref, watch} from "vue";
import {setTimeRangeBasedInActualDate} from "@/utils/formatToDate.ts";
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const userDataManagement = userDataModule()
const transactionsData = computed(() => userDataManagement.transactionDataGetter)
const transactionsTimeRange = computed(() => userDataManagement.transactionsTimeRangeGetter)

const pendentIncomesData = ref(0)
const paidIncomesData = ref(0)

const chartData: dashboardChartInterface = computed(() => ({
  labels: ['Pendent Incomes', 'Received Incomes'],
  datasets: [
    {
      data: [pendentIncomesData.value, paidIncomesData.value],
      backgroundColor: ['#28A745', 'rgba(40,167,69,0.7)'],
    },
  ],
}))

const setChartDataValues = () => {
  pendentIncomesData.value = 0
  paidIncomesData.value = 0

  transactionsData.value.forEach((transactionInArray) => {
    if (transactionInArray.transactionType === 'income'
        && transactionInArray.notFormatedTransactionDate >= transactionsTimeRange.value.startDate
        && transactionInArray.notFormatedTransactionDate <= transactionsTimeRange.value.endDate
    ) {
      if (transactionInArray.transactionState === 'pendent') {
        pendentIncomesData.value += transactionInArray.transactionValue
        return
      }

      paidIncomesData.value += transactionInArray.transactionValue
    }
  })

  console.log("Pendent Income: ", pendentIncomesData.value)
  console.log("Paid Incomes: ", paidIncomesData.value)
}

watch([transactionsTimeRange, transactionsData], () => {
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