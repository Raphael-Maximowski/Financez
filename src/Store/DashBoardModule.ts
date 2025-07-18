import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {transactionsModule} from "@/Store/TransactionsModule.ts";
import type { SavingTransactionInterface, TransactionInterface } from "@/Typescript/Interfaces/TransactionsInterface";
import type { dashBoardDataInterface } from "@/Typescript/Interfaces/DashBoardInterfaces";

export const dashBoardModule = defineStore('dashBoardModule', () => {

    const transactionsManagement = transactionsModule()
    const incomesData = computed<TransactionInterface[]>(() => transactionsManagement.incomesDataGetter)
    const expensesData = computed<TransactionInterface[]>(() => transactionsManagement.expensesDataGetter)
    const savingsData = computed<SavingTransactionInterface[]>(() => transactionsManagement.savingsDataGetter)

    const dashboardData = ref<dashBoardDataInterface[]>([
        {name: 'Total Balance', value: 0, routerParams: 'total-balance',icon: 'bi-currency-dollar', text: 'Final balance of the month.'},
        {name: 'Income', value: 0, routerParams: 'incomes', icon: 'bi-arrow-up-right-square', text: 'Amount saved.'},
        {name: 'Expense', value: 0, routerParams: 'expenses', icon: 'bi-credit-card', text: 'Total expenses this month.'},
        {name: 'Saving', value: 0, routerParams: '', icon: 'bi-cursor-fill', text: 'Amount invested this month.'}
    ])

    const dashboardDataGetter = computed<dashBoardDataInterface[]>(() => dashboardData.value)

    const setDashBoardData = (): void => {
        let incomeValue = 0
        let expenseValue = 0
        let savingValue = 0

        incomesData.value.forEach((t) => {
            incomeValue += parseInt(t.value)
        })

        savingsData.value.forEach((s) => {
            savingValue += parseInt(s.value)
        })

        expensesData.value.forEach((t) => {
            expenseValue += parseInt(t.value)
        })

        dashboardData.value[1].value = incomeValue
        dashboardData.value[2].value = expenseValue
        dashboardData.value[3].value = savingValue
        dashboardData.value[0].value = incomeValue - expenseValue
    }

    return {
        dashboardData,
        dashboardDataGetter,
        setDashBoardData
    }
}, { persist: true })