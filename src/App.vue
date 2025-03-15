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
const modalName = computed(() => modalManagement.modalNameGetter)

const setUserWidth = (): void => {
  userSettingsManagement.setUserWidth(window.innerWidth)
}

const setDataBasedInRoute = async () => {
  const sortedIncomes = [...incomesData.value].sort((a, b) => a.notFormatedDate - b.notFormatedDate)
  const sortedExpenses = [...expensesData.value].sort((a, b) => a.notFormatedDate - b.notFormatedDate)

  if (route.name === 'DashBoard View') {
    chartModule.setTableTitle('Pendent Transactions')
    chartModule.setTransactionsTableData(expensesData.value.filter((t) => t.state === 'Pendent'))
    return
  }

  if (route.name === 'Savings View') {

    

    return
  }

  switch (route.params.typeTransaction) {
    case 'total-balance':
      const uniqueDates = [
          ...new Set(sortedTransactions.map(sortedTransaction => sortedTransaction.date))
      ]

        const orderedExpenses = uniqueDates.map((uniqueDate) => {
          const expense = sortedExpenses.filter((sortedExpenses) => sortedExpenses.date === uniqueDate)
              .reduce((acc ,item) => acc + parseInt(item.value), 0)
          return expense ? expense : 0
        })

        const orderedIncomes = uniqueDates.map((uniqueDate) => {
          const income = sortedIncomes.filter((sortedIncome) => sortedIncome.date === uniqueDate).
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
      break;
    case 'expenses':
      const expensesDoughnutData = [0, 0]
      sortedExpenses.map((e) => {
        if (e.state === 'Paid') return expensesDoughnutData[0] += parseInt(e.value)
        expensesDoughnutData[1] += parseInt(e.value)
      })


        const uniqueDatesExpenses = [
            ...new Set(sortedExpenses.map((sortedExpenses) => sortedExpenses.date))
        ]

        const expensesDataFiltered = uniqueDatesExpenses.map((uniqueDate) => {
          const expenses = sortedExpenses.filter((sortedExpense) => sortedExpense.date === uniqueDate)
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
      break;
    case 'incomes':
      const incomesDoughnutData = [0, 0]
      sortedIncomes.map(i => {
        if (i.state === 'Paid') return incomesDoughnutData[0] += parseInt(i.value)
        incomesDoughnutData[1] += parseInt(i.value)
      })

        const uniqueDatesIncomes = [
            ...new Set(sortedIncomes.map((sortedIncome) => sortedIncome.date))
        ]

        const incomesDataFiltered = uniqueDatesIncomes.map((uniqueDate) => {
          const income = sortedIncomes.filter((sortedIncome) => sortedIncome.date === uniqueDate)
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
      break;
  }
}

watch(transactionsData, () => {
  setDataBasedInRoute()
}, { deep: true })

watch(route, async () => {
  if (route.name === 'DashBoard View') await transactionsModule.setTimeRange(handleTimeRange('month'))
  await setDataBasedInRoute()
})

onBeforeMount(async () => {
  await setDataBasedInRoute()
  if (route.fullPath === '/') await transactionsModule.setTimeRange(handleTimeRange('month'))
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