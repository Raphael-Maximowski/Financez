<script setup lang="ts">

import {computed, onMounted, ref, watch} from "vue";
import {transactionsModule as transactionsModuleImported} from "@/Store/TransactionsModule.ts";
import {handleCustomMonthTimeRange, handleTimeRange} from "@/Utils/formatters.ts";
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import {categoriesModule} from "@/Store/CategoriesModule.ts";
import ReportBarChart from "@/Components/Charts/ReportBarChart.vue";
import type { CategoriesInterface, SavingTransactionInterface, TransactionInterface, transactionsDataInObject, transactionsParsedInWeeks } from "@/Typescript/Interfaces/TransactionsInterface";
import type { calculateDataBasedInWeeksInterface, chartOptions } from "@/Typescript/Interfaces/ChartInterfaces";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const transactionsModule = transactionsModuleImported()
const categoriesManagement = categoriesModule()
const categoriesData = computed<CategoriesInterface>(() => categoriesManagement.categoriesDataGetter)
const expensesData = computed<TransactionInterface[]>(() => transactionsModule.expensesDataGetter)
const incomesData = computed<TransactionInterface[]>(() => transactionsModule.incomesDataGetter)
const savingsData = computed<SavingTransactionInterface[]>(() => transactionsModule.savingsDataGetter)
const reportTypeSelected = ref<number>(0)
const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const reportsType: string[] = ["Total Balance", "Category", "Incomes", "Expenses", "Savings"]
const actualDate: Date = new Date()
const timeRangeSelected = ref<number>(actualDate.getMonth())
const dataSet = ref()
const options: chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

const setTimeRangeForMonth = (): void => {
  transactionsModule.setTimeRange(handleTimeRange('month'))
}

const setCustomTimeRange = (): void => {
  transactionsModule.setTimeRange(handleCustomMonthTimeRange(timeRangeSelected.value))
}

const calculateDataBasedInWeeks = (transactionsData: transactionsDataInObject): calculateDataBasedInWeeksInterface => {
  const objectKeys = Object.keys(transactionsData)

  const dataSets = objectKeys.map((key) => {
    const dataParseInWeeks: transactionsParsedInWeeks = {}
    const transactions = transactionsData[key]
    transactions.forEach((transaction) => {
      const transactionsDate = new Date(transaction.notFormatedDate)
      const transactionDay = transactionsDate.getDate()
      const week = Math.ceil(transactionDay / 7)

      if (!dataParseInWeeks[week]) {
        dataParseInWeeks[week] = []
      }

      dataParseInWeeks[week].push(transaction)
    })

    const keysWeek = Object.keys(dataParseInWeeks)
    const valuesWeek = keysWeek.map((key: string) => {
      return dataParseInWeeks[key].reduce((acc, item) => acc + parseFloat(item?.value || '0'), 0)
    })

    return {
      label: keysWeek,
      values: valuesWeek
    }
  })

  if (objectKeys.length === 1) {
    const {label, ...rest} = dataSets[0]
    console.log("Set: ", dataSets[0])
    return {
      ...rest,
      chartLabel: label.map((weekLabel) => `Week ${weekLabel}`)
    }
  }

  const incomesData = dataSets[0]
  const expensesData = dataSets[1]
  const chartLabel = [...new Set([...incomesData.label, ...expensesData.label])];
  const values = {
    expenses: chartLabel.map((week, index) => {
      return expensesData.label.includes(week)
          ? expensesData.values[index]
          : 0

    }),
    incomes: chartLabel.map((week, index) => {
      return incomesData.label.includes(week)
          ? incomesData.values[index]
          : 0
    })
  }

  return {
    chartLabel: chartLabel.map((week) => `Week ${week}`),
    values: values
  }
}

const calculateDataSet = (): void => {
  switch (reportTypeSelected.value) {
    case 0:
      const totalBalanceCalc = calculateDataBasedInWeeks({incomes: incomesData.value, expenses: expensesData.value})
      dataSet.value = {
        labels: totalBalanceCalc.chartLabel,
        datasets: [
          {
            label: 'Incomes',
            data: Array.isArray(totalBalanceCalc.values) ? [] : totalBalanceCalc.values.incomes,
            backgroundColor: '#28A745'
          },
          {
            label: 'Expenses',
            data: Array.isArray(totalBalanceCalc.values) ? [] : totalBalanceCalc.values.expenses,
            backgroundColor: '#DC3545'
          }
        ]
      }
      break;
    case 1:
      const categoriesKeys = Object.keys(categoriesData.value)
        const categoriesTitles = categoriesKeys.map((categoryKey) => categoriesData.value[categoryKey].name)
        const categoryColors = categoriesKeys.map((categoryKey) => categoriesData.value[categoryKey].color)
      const valuePerCategory = categoriesKeys.map((key) => {
        return expensesData.value.filter((expense) => expense.categories &&  Array.isArray(expense.categories) && expense.categories.includes(key))
            .reduce((acc, expenseInCategory) => acc + parseFloat(expenseInCategory.value), 0)
      })

      dataSet.value = {
        labels: categoriesTitles,
        datasets: [
          {
            label: 'Categories',
            data: valuePerCategory,
            backgroundColor: categoryColors
          }
        ]
      }

      break;
    case 2:
      const incomesCalc = calculateDataBasedInWeeks({incomes: incomesData.value})
      dataSet.value = {
        labels: incomesCalc.chartLabel,
        datasets: [
          {
            label: 'Incomes',
            data: incomesCalc.values,
            backgroundColor: '#28A745'
          }
        ]
      }
      break;
    case 3:
      const expensesCalc = calculateDataBasedInWeeks({expenses: expensesData.value})
      dataSet.value = {
        labels: expensesCalc.chartLabel,
        datasets: [
          {
            label: 'Expenses',
            data: expensesCalc.values,
            backgroundColor: '#DC3545'
          }
        ]
      }
      break;
    case 4:
      const savingsCalc = calculateDataBasedInWeeks({savings: savingsData.value})
      dataSet.value = {
        labels: savingsCalc.chartLabel,
        datasets: [
          {
            label: 'Savings',
            data: savingsCalc.values,
            backgroundColor: '#424649'
          }
        ]
      }
      break;
  }
}

watch([savingsData, incomesData, expensesData], (): void => {
  calculateDataSet()
})

watch(timeRangeSelected, (): void => {
  setCustomTimeRange()
})

watch(reportTypeSelected, (): void => {
  calculateDataSet()
})

onMounted((): void => {
  setTimeRangeForMonth()
  calculateDataSet()
})

</script>

<template>
  <div class="w-100 h-100 d-flex flex-column gap-4">
    <div class="d-flex gap-3">
      <div class="d-flex flex-column gap-2">
        <label>Reports Avaliable</label>
        <select v-model="reportTypeSelected" class="w-auto form-select">
          <option
              v-for="(report, index) in reportsType"
              :key="index"
              :value="index"
          >
            {{ report }}
          </option>
        </select>
      </div>
      <div class="d-flex flex-column gap-2">
        <label>Month</label>
        <select v-model="timeRangeSelected " class="w-auto form-select">
          <option
              v-for="(month, index) in months"
              :key="index"
              :value="index"
          >{{ month }}
          </option>
        </select>
      </div>
    </div>

    <ReportBarChart :dataSet="dataSet" />
  </div>
</template>

<style scoped>
.bart-chart-container {
  max-height: 70vh;
}
</style>