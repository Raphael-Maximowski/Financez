<script lang="ts" setup>
import {Line} from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {computed, onMounted, ref, watch} from "vue";
import {userDataModule} from "@/stores/userDataModule.ts";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const userDataManagement = userDataModule()
const transactionTimeRange = computed(() => userDataManagement.transactionsTimeRangeGetter)
const transactionData = computed(() => userDataManagement.transactionDataGetter)
const expensesFilteredData = computed(() => transactionData.value.filter((transactionInArray) =>
    transactionInArray.transactionType === 'expense'
    && transactionInArray.notFormatedTransactionDate >= transactionTimeRange.value.startDate
    && transactionInArray.notFormatedTransactionDate <= transactionTimeRange.value.endDate
))

const incomesFilteredData = computed(() => transactionData.value.filter((transactionInArray) =>
    transactionInArray.transactionType === 'income'
    && transactionInArray.notFormatedTransactionDate >= transactionTimeRange.value.startDate
    && transactionInArray.notFormatedTransactionDate <= transactionTimeRange.value.endDate
))
const incomesFilteredValues = computed(() => incomesFilteredData.value.map((incomeFiltered) => incomeFiltered.transactionValue))
const expensesFilteredValues = computed(() => expensesFilteredData.value.map((expenseFiltered) => expenseFiltered.transactionValue))
const transactionsLabels = ref()


const data = computed(() => (
    {
      labels: transactionsLabels.value,
      datasets: [
        {
          label: 'Incomes',
          backgroundColor: '#28A745',
          data: incomesFilteredValues.value
        },
        {
          label: 'Expenses',
          backgroundColor: '#DC3545',
          data: expensesFilteredValues.value
        }
      ]
    }
))
const options = {
  responsive: true,
  maintainAspectRatio: false
}

const orderLabels = (incomesLabels, expensesLabels) => {
  const transactionLabels = incomesLabels
  expensesLabels.forEach((expenseLabel) => {
    if(!transactionLabels.includes(expenseLabel)) {
      transactionLabels.push(expenseLabel)
    }
  })

  transactionsLabels.value = transactionLabels
}
</script>

<template>
  <div class="h-100 pb-4">
    <Line :data="data" :options="options"/>
  </div>
</template>

<style scoped>

</style>