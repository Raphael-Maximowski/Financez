<script lang="ts" setup>
import {Doughnut} from "vue-chartjs";
import {Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale} from 'chart.js';
import type {dashboardChartInterface} from "@/typescript/DashBoard/interfaces.ts";
import {userDataModule} from "@/stores/userDataModule.ts";
import {computed, onMounted, ref, watch} from "vue";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const userDataManagement = userDataModule()
const transactionsData = computed(() => userDataManagement.transactionDataGetter)
const transactionsTimeRange = computed(() => userDataManagement.transactionsTimeRangeGetter)
const pendentExpensesData = ref(0)
const pendentIncomesData = ref(0)
const paidExpensesData = ref(0)
const receivedIncomesData = ref(0)


const chartData: dashboardChartInterface = computed(() => ({
  labels: ['Pendent Incomes', 'Received Incomes', 'Pendent Expenses', 'Paid Expenses'],
  datasets: [
    {
      data: [pendentIncomesData.value, receivedIncomesData.value, pendentExpensesData.value, paidExpensesData.value],
      backgroundColor: ['#28A745', 'rgba(40,167,69,0.7)', '#DC3545', 'rgba(220,53,69,0.66)'],
    },
  ],
}))

const setChartsDataValues = () => {
  pendentExpensesData.value = 0
  pendentIncomesData.value = 0
  paidExpensesData.value = 0
  receivedIncomesData.value = 0

  transactionsData.value.forEach((transaction) => {
    switch (transaction.transactionType) {
      case 'expense':
        if (transaction.notFormatedTransactionDate >= transactionsTimeRange.value.startDate
            && transaction.notFormatedTransactionDate <= transactionsTimeRange.value.endDate) {
          if (transaction.transactionState === 'paid') {
            paidExpensesData.value += transaction.transactionValue
            return
          }

          pendentExpensesData.value += transaction.transactionValue
        }
        break;
      case 'income':
        if (transaction.notFormatedTransactionDate >= transactionsTimeRange.value.startDate
        && transaction.notFormatedTransactionDate <= transactionsTimeRange.value.endDate
      ) {
          if (transaction.transactionState === 'paid') {
            receivedIncomesData.value += transaction.transactionValue
            return
          }

          pendentIncomesData.value += transaction.transactionValue
      }
        break;
    }
  })
}

onMounted(() => {
  setChartsDataValues()
})

watch([transactionsTimeRange, transactionsData], () => {
  setChartsDataValues()
})
</script>

<template>
  <div class="mt-4 mt-xxl-0 col-10 w-100 h-100 d-flex align-items-center justify-content-center">
    <Doughnut :data="chartData" :options="{ responsive: true }"/>
  </div>
</template>

<style scoped>

</style>