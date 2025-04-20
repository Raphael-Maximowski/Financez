<script setup lang="ts">
import Header from "@/Components/Header.vue";
import {userSettingsModule} from "@/Store/UserSettingsModule.ts";
import {computed, onBeforeMount, onBeforeUnmount, onMounted, ref, watch} from "vue";
import TransactionsModal from "@/Components/Modals/TransactionsModal.vue";
import {modalManagementModule} from "@/Store/ModalManagementModule.ts";
import {transactionsDataModule} from "@/Store/TransactionsDataModule.ts";
import {chartsDataModule} from "@/Store/ChartsDataModule.ts";
import {useRoute} from "vue-router";
import {handleTimeRange} from "@/Utils/relatedToTimeFunctions.ts";

const route = useRoute()
const userSettingsManagement: any = userSettingsModule()
const transactionsModule = transactionsDataModule()
const modalManagement = modalManagementModule()
const chartModule = chartsDataModule()
const transactionsData = computed(() => transactionsModule.transactionsDataGetter)
const expensesData = computed(() => transactionsModule.expensesDataGetter)
const incomesData = computed(() => transactionsModule.incomesDataGetter)
const savingsData = computed(() => transactionsModule.savingsDataGetter)
const goalsData = computed(() => transactionsModule.goalsDataGetter)
const modalName = computed(() => modalManagement.modalNameGetter)
const sortedIncomes = computed(() => incomesData.value.sort((a, b) => a.notFormatedDate - b.notFormatedDate))
const sortedExpenses = computed(() => expensesData.value.sort((a, b) => a.notFormatedDate - b.notFormatedDate))
const sortedTransactions = computed(() => [...incomesData.value, ...expensesData.value].sort((a, b) => a.notFormatedDate - b.notFormatedDate))
const sortedSavings = computed(() => savingsData.value.sort((a, b) => a.notFormatedDate - b.notFormatedDate))

const setUserWidth = (): void => {
  userSettingsManagement.setUserWidth(window.innerWidth)
}

const checkIfUserIsInDashBoardView = () => {
  if (route.name === 'DashBoard View') transactionsModule.setTimeRange(handleTimeRange('month'))
}

const setIncomesViewData = () => {
  const incomesDoughnutData = [0, 0]
  sortedIncomes.value.map(i => {
    if (i.state === 'Paid') return incomesDoughnutData[0] += parseInt(i.value)
    incomesDoughnutData[1] += parseInt(i.value)
  })

  const uniqueDatesIncomes = [
    ...new Set(sortedIncomes.value.map((sortedIncome) => sortedIncome.date))
  ]

  const incomesDataFiltered = uniqueDatesIncomes.map((uniqueDate) => {
    const income = sortedIncomes.value.filter((sortedIncome) => sortedIncome.date === uniqueDate)
        .reduce((acc, item) => acc + parseInt(item.value), 0)

    return income ? income : 0
  })

  const dataSetsIncomes = [
    {
      label: 'Incomes',
      data: incomesDataFiltered,
      backgroundColor: '#28A745'
    },
  ]

  const doughnutIncomesDataSets = {
    labels: ['Paid Incomes', 'Pendent Incomes'],
    datasets: [
      {
        backgroundColor: ['#28A745', 'rgba(40,167,69,0.65)'],
        data: incomesDoughnutData
      }
    ]
  }

  chartModule.setTableTitle('Incomes')
  chartModule.setDoughnutData(doughnutIncomesDataSets)
  chartModule.setTransactionsTableData(incomesData.value)
  chartModule.setLineChartConfig(dataSetsIncomes, uniqueDatesIncomes)
}

const setExpensesViewData = () => {
  const expensesDoughnutData = [0, 0]
  sortedExpenses.value.map((e) => {
    if (e.state === 'Paid') return expensesDoughnutData[0] += parseInt(e.value)
    expensesDoughnutData[1] += parseInt(e.value)
  })


  const uniqueDatesExpenses = [
    ...new Set(sortedExpenses.value.map((sortedExpense) => sortedExpense.date))
  ]

  const expensesDataFiltered = uniqueDatesExpenses.map((uniqueDate) => {
    const expenses = sortedExpenses.value.filter((sortedExpense) => sortedExpense.date === uniqueDate)
        .reduce((acc, item) => acc + parseInt(item.value), 0)

    return expenses ? expenses : 0
  })

  const dataSetsExpenses = [
    {
      label: 'Expenses',
      data: expensesDataFiltered,
      backgroundColor: '#DC3545'
    },
  ]

  const doughnutExpensesDataSet = {
    labels: ['Paid Expenses', 'Pendent Expenses'],
    datasets: [
      {
        backgroundColor: ['#DC3545', 'rgba(220,53,69,0.64)'],
        data: expensesDoughnutData
      }
    ]
  }

  chartModule.setTableTitle('Expenses')
  chartModule.setDoughnutData(doughnutExpensesDataSet)
  chartModule.setTransactionsTableData(expensesData.value)
  chartModule.setLineChartConfig(dataSetsExpenses, uniqueDatesExpenses)
}

const setTotalBalanceViewData = () => {
  const uniqueDates = [
    ...new Set(sortedTransactions.value.map(sortedTransaction => sortedTransaction.date))
  ]

  const orderedExpenses = uniqueDates.map((uniqueDate) => {
    const expense = sortedExpenses.value.filter((sortedExpense) => sortedExpense.date === uniqueDate)
        .reduce((acc ,item) => acc + parseInt(item.value), 0)
    return expense ? expense : 0
  })

  const orderedIncomes = uniqueDates.map((uniqueDate) => {
    const income = sortedIncomes.value.filter((sortedIncome) => sortedIncome.date === uniqueDate).
    reduce((acc, item) => acc + parseInt(item.value), 0)
    return income? income : 0
  })

  const totalBalanceDoughnutData = [0, 0, 0, 0]
  expensesData.value.map(e => {
    if (e.state === 'Paid') return totalBalanceDoughnutData[0] += parseInt(e.value)
    totalBalanceDoughnutData[1] += parseInt(e.value)
  })

  incomesData.value.map(i => {
    if (i.state === 'Paid') return totalBalanceDoughnutData[2] += parseInt(i.value)
    totalBalanceDoughnutData[3] += parseInt(i.value)
  })

  const dataSetsTotalBalance = [
    {
      label: 'Expenses',
      data: orderedExpenses,
      backgroundColor: '#DC3545'
    },
    {
      label: 'Incomes',
      data: orderedIncomes,
      backgroundColor: '#28A745'
    },
  ]

  const doughnutTotalBalanceDataSet = {
    labels: ['Paid Expenses', 'Pendent Expenses', 'Paid Incomes', 'Pendent Incomes'],
    datasets: [
      {
        backgroundColor: ['#DC3545', 'rgba(220,53,69,0.64)', '#28A745', 'rgba(40,167,69,0.65)'],
        data: totalBalanceDoughnutData
      }
    ]
  }

  chartModule.setTableTitle('Total Balance')
  chartModule.setDoughnutData(doughnutTotalBalanceDataSet)
  chartModule.setTransactionsTableData(transactionsData.value)
  chartModule.setLineChartConfig(dataSetsTotalBalance, uniqueDates)
}

const calcGoalsPercentage = () => {
  transactionsModule.calculateGoalsPercentages()
}

const setSavingsViewData = () => {
  const uniqueSavingsData = [
    ...new Set(sortedSavings.value.map(s => s.date))
  ]

  const savingsDataFiltered = uniqueSavingsData.map((uniqueDate) => {
    const savingsInDate = sortedSavings.value.filter((s) => s.date === uniqueDate)
        .reduce((acc, item) => acc + parseInt(item.value), 0)
    return savingsInDate ? savingsInDate : 0
  })

  const savingsDataSet = [
    {
      label: 'Savings',
      data: savingsDataFiltered,
      backgroundColor: '#424649'
    }
  ]

  chartModule.setTableTitle("Savings")
  chartModule.setTransactionsTableData(savingsData.value.sort((a, b) => b.notFormatedDate - a.notFormatedDate))
  chartModule.setLineChartConfig(savingsDataSet, uniqueSavingsData)

}

const setDataBasedInRoute = async () => {
  if (route.name === 'DashBoard View') {
    chartModule.setTableTitle('Pendent Transactions')
    chartModule.setTransactionsTableData(expensesData.value.filter((t) => t.state === 'Pendent'))
    return
  }

  if(route.name === 'Savings View') {
    setSavingsViewData()
    return
  }

  switch (route.params.typeTransaction) {
    case 'total-balance':
      setTotalBalanceViewData()
      break;
    case 'expenses':
      setExpensesViewData()
      break;
    case 'incomes':
      setIncomesViewData()
      break;
  }
}

watch([transactionsData, savingsData], async () => {
  await setDataBasedInRoute()
}, { deep: true })

watch(route, async () => {
  await setDataBasedInRoute()
  await checkIfUserIsInDashBoardView()
})

onBeforeMount(async () => {
  await setDataBasedInRoute()
  await checkIfUserIsInDashBoardView()
  await calcGoalsPercentage()
  window.addEventListener('resize', setUserWidth)
})

onBeforeUnmount((): void => {
  window.removeEventListener('resize', setUserWidth)
})
</script>

<template>
  <div class="px-5 pb-5 d-flex flex-column vw-100 vh-100">
    <Header/>
    <div class="pt-4 flex-grow-1">
      <RouterView/>
    </div>

  </div>

  <TransactionsModal v-if="modalName === 'TransactionsModal'"/>
</template>

<style scoped>

</style>