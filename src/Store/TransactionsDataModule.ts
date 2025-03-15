import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {expensesDataMockUp, goalsMockUp, incomesDataMockUp, savingsDataMockUp} from "@/Data/TransactionsMockUp.ts";
import {notificationModule} from "@/Store/NotificationModule.ts";

export const transactionsDataModule = defineStore('transactionsDataModule', () => {

    const notificationManagement = notificationModule()

    const transactionsData = ref({
        expenses: expensesDataMockUp,
        incomes: incomesDataMockUp,
        savings: savingsDataMockUp,
        goals: goalsMockUp,
        timeRange: {
            startDate: '',
            endDate: ''
        }
    })

    const goalsDataGetter = computed(() => transactionsData.value.goals)
    const savingsDataGetter = computed(() => transactionsData.value.savings
        .sort((a, b) => b.notFormatedDate - a.notFormatedDate)
        .filter((t) => t.notFormatedDate >= transactionsData.value.timeRange.startDate
            && t.notFormatedDate <= transactionsData.value.timeRange.endDate
        ))
    const expensesDataGetter = computed(() => transactionsData.value.expenses
        .sort((a ,b) => b.notFormatedDate - a.notFormatedDate)
        .filter((t) => t.notFormatedDate >= transactionsData.value.timeRange.startDate
            && t.notFormatedDate <= transactionsData.value.timeRange.endDate
        ))
    const incomesDataGetter = computed(() => transactionsData.value.incomes
        .sort((a, b) => b.notFormatedDate - a.notFormatedDate)
        .filter((t) => t.notFormatedDate >= transactionsData.value.timeRange.startDate
            && t.notFormatedDate <= transactionsData.value.timeRange.endDate
        ))
    const transactionsDataGetter = computed(() => [...expensesDataGetter.value, ...incomesDataGetter.value]
        .sort((a, b) => b.notFormatedDate - a.notFormatedDate)
        .filter((t) => t.notFormatedDate >= transactionsData.value.timeRange.startDate
            && t.notFormatedDate <= transactionsData.value.timeRange.endDate
        ))

    const setTransactionsAsPaid = (transactionId, transactionType) => {
        if (!transactionId || !transactionType) return
        switch (transactionType && transactionType) {
            case 'Expense' :
                const expenseIndex = transactionsData.value.expenses.findIndex((expense) => expense.id === transactionId)
                transactionsData.value.expenses[expenseIndex].state = 'Paid'
                break;
            case 'Income':
                const incomeIndex = transactionsData.value.incomes.findIndex((income) => income.id === transactionId)
                transactionsData.value.incomes[incomeIndex].state = 'Paid'
                break;
        }

        notificationManagement.displaySuccessMessage("Transaction Status Changed!")
    }

    const setTimeRange = (timeRange) => {
        if (!timeRange) return
        transactionsData.value.timeRange.startDate = timeRange.startDate
        transactionsData.value.timeRange.endDate = timeRange.endDate
    }

    const updateTransaction = (transactionData) => {
        switch (transactionData.type) {
            case 'Income':
                const incomeIndex = transactionsData.value.incomes.findIndex((t) => t.id === transactionData.id)
                transactionsData.value.incomes.splice(incomeIndex, 1, transactionData)
                break;
            case 'Expense':
                const expenseIndex = transactionsData.value.expenses.findIndex((t) => t.id === transactionData.id)
                transactionsData.value.expenses.splice(expenseIndex, 1, transactionData)
                break;
        }

        notificationManagement.displaySuccessMessage("Transaction Edited With Success")
    }

    const deleteTransaction = (transactionData) => {
        switch (transactionData.type) {
            case 'Income':
                const incomeIndex = transactionsData.value.incomes.findIndex((t) => t.id === transactionData.id)
                transactionsData.value.incomes.splice(incomeIndex, 1)
                break;
            case 'Expense':
                const expenseIndex = transactionsData.value.expenses.findIndex((t) => t.id === transactionData.id)
                transactionsData.value.expenses.splice(expenseIndex, 1)
                break;
        }

        notificationManagement.displaySuccessMessage("Transaction Excluded With Success")
    }

    const setTransactionData = (transactionData) => {
        switch (transactionData.type) {
            case 'Income':
                const incomeId = transactionsData.value.incomes.length === 0 ? 1 : transactionsData.value.incomes[transactionsData.value.incomes.length - 1].id + 1
                const incomeToPush = {
                    ...transactionData,
                    id: incomeId
                }
                transactionData && (transactionsData.value.incomes.push(incomeToPush))
                break;
            case 'Expense':
                const expenseId = transactionsData.value.expenses.length === 0 ? 1 : transactionsData.value.expenses[transactionsData.value.expenses.length - 1].id + 1
                const expenseToPush = {
                    ...transactionData,
                    id: expenseId
                }
                transactionData && (transactionsData.value.expenses.push(expenseToPush))
                break;
        }

        notificationManagement.displaySuccessMessage("Transaction Created With Success")
    }

    return {
        savingsDataGetter,
        setTransactionsAsPaid,
        goalsDataGetter,
        setTransactionData,
        deleteTransaction,
        updateTransaction,
        expensesDataGetter,
        incomesDataGetter,
        transactionsDataGetter,
        setTimeRange
    }

})