<script setup lang="ts">
import TransactionsMetricsDropDown from "@/Components/DropDowns/OverviewSettingsDropdown.vue";
import TransactionsTables from "@/Components/Tables/TransactionsTables.vue";
import MetricsLine from "@/Components/Charts/OverviewLineChart.vue";
import MetricDoughnut from "@/Components/Charts/OverviewDoughnutChart.vue";
import Draggable from "vuedraggable";
import {computed, onBeforeMount, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import GoalCard from "@/Components/Cards/GoalCard.vue";
import {transactionsModule} from "@/Store/TransactionsModule.ts";
import CreateGoal from "@/Components/Modals/GoalManagementModal.vue";
import {modalModule} from "@/Store/ModalModule.ts";
import InvestmentModal from "@/Components/Modals/InvestmentManagementModal.vue";
import {chartsModule} from "@/Store/ChartsModule.ts";
import type { GoalDataInterface } from "@/Typescript/Interfaces/GoalInterfaces";
import type { GoalInterface, SavingTransactionInterface, TransactionInterface, transactionsDataInObject } from "@/Typescript/Interfaces/TransactionsInterface";
import type { lineChartDataSetInterface } from "@/Typescript/Interfaces/ChartInterfaces";

const router = useRouter()
const route = useRoute()
const transactionsManagement = transactionsModule()
const modalManagement = modalModule()
const chartModule = chartsModule()
const modalName = computed<string | null>(() => modalManagement.modalNameGetter)
const goalsDataComputed = computed<GoalInterface[]>(() => transactionsManagement.goalsDataGetter)
const goalsData = ref<GoalInterface[]>(goalsDataComputed.value.sort((a, b) => a?.index - b.index));
const inSavingsView = computed<Boolean>(() => route.name === 'Savings View')
const shouldCalculateDashboardData = computed<Boolean>(() => transactionsManagement.shouldCalculateDashboardDataGetters)

const transactionsData = computed<TransactionInterface[]>(() => transactionsManagement.transactionsDataGetter)
const expensesData = computed<TransactionInterface[]>(() => transactionsManagement.expensesDataGetter)
const sortedExpenses = computed<TransactionInterface[]>(() => transactionsManagement.notOrderedExpensesData)
const savingsData = computed<SavingTransactionInterface[]>(() => transactionsManagement.savingsDataGetter)
const sortedSavings = computed<SavingTransactionInterface[]>(() => transactionsManagement.notOrderedSavingsData)
const incomesData = computed<TransactionInterface[]>(() => transactionsManagement.incomesDataGetter)
const sortedIncomes = computed<TransactionInterface[]>(() => transactionsManagement.notOrderedIncomesData)
const sortedTransactions = computed<TransactionInterface[]>(() => [...sortedIncomes.value, ...sortedExpenses.value].sort((a, b) => new Date(a.notFormatedDate).getTime() - new Date(b.notFormatedDate).getTime()))

const transactionsTimeRange = computed<string | Date>(() => transactionsManagement.transactionsTimeRangeGetter)
const monthsArray: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const labelMonthsForLineChart = ref<string[]>([])

const openCreateOrUpdateGoal = (goalData: GoalInterface | null = null): void => {
  modalManagement.setModalState({
    state: true,
    name: 'Create Or Update Goal',
    ...(goalData && {extraData: goalData})
  })
}

const registerGoalMovement = (event: any): void => {
  transactionsManagement.orderGoalsArray(event.moved)
}

const setValueToReference = (): void => {
  goalsData.value = goalsDataComputed.value
}

const redirectToReportsView = (): void => {
  router.push({name: 'Reports View'})
}

const handleYearTimeRange = (transactions: transactionsDataInObject, colors: string[]): lineChartDataSetInterface[] => {
  let lastMonthRelatedToTransactions = 11
  const transactionsDataSets: lineChartDataSetInterface[] = []
  labelMonthsForLineChart.value = []

  for (let i = 0; i < lastMonthRelatedToTransactions; i++) {
    labelMonthsForLineChart.value.push(monthsArray[i])
  }

  Object.entries(transactions).forEach(([objectKey, transactions], index) => {
    const monthsRelatedToTransaction = []
    const totalValuesRelatedToMonths = []

    for(let i = 0; i < lastMonthRelatedToTransactions; i ++) {
      const firstDayOfMonth = new Date(2025, i, 1)
      const firstDayOfNextMonth = new Date(2025, i + 1, 1)

      const totalValueRelatedToMonth = transactions.filter((t) => new Date(t.notFormatedDate) >= firstDayOfMonth
          && new Date(t.notFormatedDate) < firstDayOfNextMonth
      ).reduce((acc, transaction) => acc + parseInt(transaction.value), 0)

      monthsRelatedToTransaction.push(monthsArray[i + 1])
      totalValuesRelatedToMonths.push(totalValueRelatedToMonth)
    }

    transactionsDataSets.push({
      label: objectKey,
      data: totalValuesRelatedToMonths,
      backgroundColor: colors[index]
    })
  })

  return transactionsDataSets
}

const setIncomesViewData = (): void => {
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

  const dataSetsIncomes = transactionsTimeRange.value === 'year' ?
      handleYearTimeRange({Incomes: sortedIncomes.value}, ['#28A745'])
      : [{
        label: 'Incomes',
        data: incomesDataFiltered,
        backgroundColor: '#28A745'
      }]

  const doughnutIncomesDataSets = {
    labels: ['Paid Incomes', 'Pendent Incomes'],
    datasets: [
      {
        backgroundColor: ['#28A745', 'rgba(40,167,69,0.65)'],
        data: incomesDoughnutData
      }
    ]
  }

  const lineChartLabels = transactionsTimeRange.value === 'year' ?
      labelMonthsForLineChart.value
      : uniqueDatesIncomes

  chartModule.setTableTitle('Incomes')
  chartModule.setDoughnutData(doughnutIncomesDataSets)
  chartModule.setTransactionsTableData(incomesData.value)
  chartModule.setLineChartConfig(dataSetsIncomes, lineChartLabels)
}

const setDataBasedInRoute = async (): Promise<void> => {
  if (route.name === 'Savings View') {
    setSavingsViewData()
    calcGoalsPercentage()
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

const setExpensesViewData = (): void => {
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

  const dataSetsExpenses = transactionsTimeRange.value === 'year' ?
      handleYearTimeRange({Expenses: sortedExpenses.value}, ['#DC3545'])
      : [{
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

  const lineChartLabel = transactionsTimeRange.value === 'year' ?
      labelMonthsForLineChart.value
      : uniqueDatesExpenses

  chartModule.setTableTitle('Expenses')
  chartModule.setDoughnutData(doughnutExpensesDataSet)
  chartModule.setTransactionsTableData(expensesData.value)
  chartModule.setLineChartConfig(dataSetsExpenses, lineChartLabel)
}

const setTotalBalanceViewData = (): void => {
  const uniqueDates = [
    ...new Set(sortedTransactions.value.map(sortedTransaction => sortedTransaction.date))
  ]

  const orderedExpenses = uniqueDates.map((uniqueDate) => {
    const expense = sortedExpenses.value.filter((sortedExpense) => sortedExpense.date === uniqueDate)
        .reduce((acc, item) => acc + parseInt(item.value), 0)
    return expense ? expense : 0
  })

  const orderedIncomes = uniqueDates.map((uniqueDate) => {
    const income = sortedIncomes.value.filter((sortedIncome) => sortedIncome.date === uniqueDate).reduce((acc, item) => acc + parseInt(item.value), 0)
    return income ? income : 0
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


  transactionsTimeRange.value === 'year' && handleYearTimeRange(
      {
        Expenses: sortedExpenses.value,
        incomes: sortedIncomes.value
      }, ['#DC3545', '#28A745'])

  const dataSetsTotalBalance = transactionsTimeRange.value === 'year' ?
      handleYearTimeRange(
          {
            Expenses: sortedExpenses.value,
            incomes: sortedIncomes.value
          }, ['#DC3545', '#28A745']
      )
      : [
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

  const lineChatLabels = transactionsTimeRange.value === 'year' ?
      labelMonthsForLineChart.value
      : uniqueDates

  chartModule.setTableTitle('Total Balance')
  chartModule.setDoughnutData(doughnutTotalBalanceDataSet)
  chartModule.setTransactionsTableData(transactionsData.value)
  chartModule.setLineChartConfig(dataSetsTotalBalance, lineChatLabels)
}

const calcGoalsPercentage = (): void => {
  transactionsManagement.calculateGoalsPercentages()
}

const setSavingsViewData = (): void => {
  const uniqueSavingsData = [
    ...new Set(sortedSavings.value.map(s => String(s.date)))
  ]

  const savingsDataFiltered = uniqueSavingsData.map((uniqueDate) => {
    const savingsInDate = sortedSavings.value.filter((s) => s.date === uniqueDate)
        .reduce((acc, item) => acc + parseInt(item.value), 0)
    return savingsInDate ? savingsInDate : 0
  })

  const savingsDataSet = transactionsTimeRange.value === 'year' ?
      handleYearTimeRange({Savings: sortedSavings.value}, ['#424649'])
      : [
        {
          label: 'Savings',
          data: savingsDataFiltered,
          backgroundColor: '#424649'
        }
      ]

  const lineChartLabels = transactionsTimeRange.value === 'year' ?
      labelMonthsForLineChart.value
      : uniqueSavingsData

  chartModule.setTableTitle("Savings")
  chartModule.setTransactionsTableData(savingsData.value)
  chartModule.setLineChartConfig(savingsDataSet, lineChartLabels)
}

const checkShouldCalculateData = (): void => {
  if (shouldCalculateDashboardData.value) {
    setDataBasedInRoute()
    resetShouldCalculateDashboardData()
  }
}

const resetShouldCalculateDashboardData = (): void => {
  transactionsManagement.setShouldCalculateDashboardData(false)
}

watch(shouldCalculateDashboardData, (): void => {
  checkShouldCalculateData()
}, { deep: true })

watch([route, transactionsTimeRange], (): void => {
  setDataBasedInRoute()
})

watch(goalsDataComputed, (): void => {
  setValueToReference()
}, {deep: true})
</script>

<template>
  <div class="w-100 h-100 d-flex flex-column">

    <div class="w-100 align-items-end gap-2 justify-content-between d-flex flex-wrap">
      <TransactionsMetricsDropDown/>
      <button @click="redirectToReportsView" class="btn btn-dark">Reports</button>
    </div>

    <div class="content-container d-xxl-flex  flex-grow-1 pt-4">
      <div class="d-flex flex-column left-container-content col-xxl-9 col-12 h-100">
        <div class="w-100 h-50">
          <MetricsLine/>
        </div>
        <div class="table-container w-100 h-50">
          <TransactionsTables/>
        </div>
      </div>
      <div class="col-xxl-3 col-12 h-100">
        <div v-if="!inSavingsView" class="d-flex w-100 h-100 align-items-center justify-content-center">
          <MetricDoughnut/>
        </div>
        <div class="h-100 ps-xxl-3 card-wrapper" v-else>
          <button @click="openCreateOrUpdateGoal(null)" class="btn btn-dark w-100  mb-3">+ Create Goal</button>
          <draggable
              v-model="goalsData"
              tag="div"
              handle=".bi-three-dots-vertical"
              @change="(event: any)=> registerGoalMovement(event)"
              :item-key="(key: string) => key"
              animation="350"
          >
            <template #item="{ element }">
              <div>
                <GoalCard
                    @click="openCreateOrUpdateGoal(element)"
                    :goal="element"/>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>

  <InvestmentModal v-if="modalName === 'Investment Modal'"/>
  <CreateGoal v-if="modalName == 'Create Or Update Goal'"/>
</template>

<style scoped>


.card-wrapper {
  padding-top: 32px;
}

.left-container-content {
  gap: 20px;
}

.content-container {
  height: 75vh;
}

.table-container {
  max-height: 100%;
}
</style>