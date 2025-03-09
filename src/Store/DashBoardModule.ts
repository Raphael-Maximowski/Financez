import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {transactionsDataModule} from "@/Store/TransactionsDataModule.ts";

export const dashBoardModule = defineStore('dashBoardModule', () => {

    const transactionsManagement = transactionsDataModule()
    const incomesData = computed(() => transactionsManagement.incomesDataGetter)
    const expensesData = computed(() => transactionsManagement.expensesDataGetter)

    const dashboardData = ref([
        {name: 'Total Balance', value: 0, routerParams: 'total-balance', percentage: 0},
        {name: 'Income', value: 0, routerParams: 'incomes', percentage: 0},
        {name: 'Expense', value: 0, routerParams: 'expenses', percentage: 0},
        {name: 'Saving', value: 0, routerParams: '', percentage: 0}
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