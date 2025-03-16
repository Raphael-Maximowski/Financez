import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {transactionsDataModule} from "@/Store/TransactionsDataModule.ts";

export const dashBoardModule = defineStore('dashBoardModule', () => {

    const transactionsManagement = transactionsDataModule()
    const incomesData = computed(() => transactionsManagement.incomesDataGetter)
    const expensesData = computed(() => transactionsManagement.expensesDataGetter)

    const dashboardData = ref([
        {name: 'Total Balance', value: 0, routerParams: 'total-balance',icon: 'bi-currency-dollar', text: 'Final balance of the month.'},
        {name: 'Income', value: 0, routerParams: 'incomes', icon: 'bi-arrow-up-right-square', text: 'Amount saved.'},
        {name: 'Expense', value: 0, routerParams: 'expenses', icon: 'bi-credit-card', text: 'Total expenses this month.'},
        {name: 'Saving', value: 0, routerParams: '', icon: 'bi-cursor-fill', text: 'Amount invested this month.'}
    ])

    const dashboardDataGetter = computed(() => dashboardData.value)

    const setDashBoardData = () => {
        let incomeValue = 0
        let expenseValue = 0

        incomesData.value.forEach((t) => {
            incomeValue += parseInt(t.value)
        })

        expensesData.value.forEach((t) => {
            expenseValue += parseInt(t.value)
        })

        dashboardData.value[1].value = incomeValue
        dashboardData.value[2].value = expenseValue
        dashboardData.value[0].value = parseInt(incomeValue - expenseValue)
    }

    return {
        setDashBoardData,
        dashboardDataGetter
    }
})