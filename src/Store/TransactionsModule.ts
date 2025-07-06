import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {expensesDataMockUp, goalsMockUp, incomesDataMockUp, savingsDataMockUp} from "@/Data/TransactionsData.ts";
import {notificationModule} from "@/Store/NotificationModule.ts";
import type { SavingTransactionInterface, timeRangeInterface, TransactionInterface, TransactionsModuleState } from "@/Typescript/Interfaces/TransactionsInterface";
import type { GoalDataInterface } from "@/Typescript/Interfaces/GoalInterfaces";

export const transactionsModule = defineStore('transactionsModule', () => {

    const notificationManagement = notificationModule()

    const transactionsData = ref<TransactionsModuleState>({
        expenses: expensesDataMockUp,
        incomes: incomesDataMockUp,
        savings: savingsDataMockUp,
        goals: goalsMockUp,
        timeRange: {
            startDate: '',
            endDate: '',
            name: ''
        },
        shouldCalculateDashboardData: false
    })

    const defaultExpenses = computed(() => transactionsData.value.expenses)

    const shouldCalculateDashboardDataGetters = computed(() => transactionsData.value.shouldCalculateDashboardData)

    const goalsDataGetter = computed(() => transactionsData.value.goals.sort((a , b) => a.index - b.index))

    const transactionsTimeRangeGetter = computed(() => transactionsData.value.timeRange.name)

    const notOrderedSavingsData = computed(() => transactionsData.value.savings
        .sort((a, b) => new Date(a.notFormatedDate).getTime() - new Date(b.notFormatedDate).getTime())
        .filter((t) => new Date(t.notFormatedDate).getTime() >= new Date(transactionsData.value.timeRange.startDate).getTime()
            && new Date(t.notFormatedDate).getTime() <= new Date(transactionsData.value.timeRange.endDate).getTime()
        ))

    const savingsDataGetter = computed(() => [...transactionsData.value.savings]
        .sort((a, b) => new Date(b.notFormatedDate).getTime() - new Date(a.notFormatedDate).getTime())
        .filter((t) => new Date(t.notFormatedDate).getTime() >= new Date(transactionsData.value.timeRange.startDate).getTime()
            && new Date(t.notFormatedDate).getTime() <= new Date(transactionsData.value.timeRange.endDate).getTime()
        ))

    const notOrderedExpensesData = computed(() => transactionsData.value.expenses
        .sort((a, b) => new Date(a.notFormatedDate).getTime() - new Date(b.notFormatedDate).getTime())
        .filter((t) => new Date(t.notFormatedDate).getTime() >= new Date(transactionsData.value.timeRange.startDate).getTime()
            && new Date(t.notFormatedDate).getTime() <= new Date(transactionsData.value.timeRange.endDate).getTime()
        ))

    const expensesDataGetter = computed(() => [...transactionsData.value.expenses]
        .sort((a ,b) => new Date(b.notFormatedDate).getTime() - new Date(a.notFormatedDate).getTime())
        .filter((t) => new Date(t.notFormatedDate).getTime() >= new Date(transactionsData.value.timeRange.startDate).getTime()
            && new Date(t.notFormatedDate).getTime() <= new Date(transactionsData.value.timeRange.endDate).getTime()
        ))

    const notOrderedIncomesData = computed(() => transactionsData.value.incomes
        .sort((a, b) => new Date(a.notFormatedDate).getTime() - new Date(b.notFormatedDate).getTime())
        .filter((t) => new Date(t.notFormatedDate).getTime() >= new Date(transactionsData.value.timeRange.startDate).getTime()
            && new Date(t.notFormatedDate).getTime() <= new Date(transactionsData.value.timeRange.endDate).getTime()
        ))
    const incomesDataGetter = computed(() => [...transactionsData.value.incomes]
        .sort((a, b) => new Date(b.notFormatedDate).getTime() - new Date(a.notFormatedDate).getTime())
        .filter((t) => new Date(t.notFormatedDate).getTime() >= new Date(transactionsData.value.timeRange.startDate).getTime()
            && new Date(t.notFormatedDate).getTime() <= new Date(transactionsData.value.timeRange.endDate).getTime()
        ))


    const transactionsDataGetter = computed(() => [...expensesDataGetter.value, ...incomesDataGetter.value]
        .sort((a, b) => new Date(b.notFormatedDate).getTime() - new Date(a.notFormatedDate).getTime())
        .filter((t) => new Date(t.notFormatedDate).getTime() >= new Date(transactionsData.value.timeRange.startDate).getTime()
            && new Date(t.notFormatedDate).getTime() <= new Date(transactionsData.value.timeRange.endDate).getTime()
        ))

    const setShouldCalculateDashboardData = (state: boolean): void => {
        transactionsData.value.shouldCalculateDashboardData = state
    }

    const orderGoalsArray = (event: any): void => {
        const goalMovedIndex = transactionsData.value.goals.findIndex((g) => g.id === event.element.id)
        if (goalMovedIndex !== -1) {
            if (event.newIndex > event.oldIndex) {

                transactionsData.value.goals.map((goal, index) => {
                    if (goal.index > event.oldIndex && goal.index <= event.newIndex) {
                        transactionsData.value.goals[index].index--
                    }
                })
                transactionsData.value.goals[goalMovedIndex].index = event.newIndex
                return
            }

            transactionsData.value.goals.map((goal, index) => {
                if (goal.index < event.oldIndex && goal.index >= event.newIndex) {
                    transactionsData.value.goals[index].index++
                }
            })
           transactionsData.value.goals[goalMovedIndex].index = event.newIndex
        }
    }

    const calculateSpecificGoalPercentage = (goalId: number): void => {
        const goalIndex = transactionsData.value.goals.findIndex((g) => g.id === goalId)

        if (goalIndex !== -1) {
            const amountSaved = transactionsData.value.goals[goalIndex].transactionsAssociated.map((t) => parseInt(t.value)).reduce((a, b) => a + b, 0) || 0
            let amountPendent = parseInt(transactionsData.value.goals[goalIndex].value) - amountSaved
            amountPendent < 0 && (amountPendent = 0)
            const percentageAchieved = Math.min(100, Math.max(0, (amountSaved / parseInt(transactionsData.value.goals[goalIndex].value)) * 100));

            transactionsData.value.goals[goalIndex].amountSaved = amountSaved
            transactionsData.value.goals[goalIndex].amountPendent = amountPendent
            transactionsData.value.goals[goalIndex].percentageAchieved = percentageAchieved
        }
    }

    const calculateGoalsPercentages = (): void => {
        transactionsData.value.goals.map((goal, index) => {
            const amountSaved = goal.transactionsAssociated.map((t) => parseInt(t.value)).reduce((a, b) => a + b, 0) || 0
            let amountPendent = parseInt(goal.value) - amountSaved
            amountPendent < 0 && (amountPendent = 0)
            const percentageAchieved = Math.min(100, Math.max(0, (amountSaved / parseInt(goal.value)) * 100));

            transactionsData.value.goals[index] = {
                ...goal,
                amountSaved: amountSaved,
                amountPendent: amountPendent,
                percentageAchieved: percentageAchieved
            }
        })
    }

    const deleteInvestment = (investmentData: { goalId: number; investmentId: number }): void => {
        setShouldCalculateDashboardData(true)
        const investmentIndexInSaving = transactionsData.value.savings
            .findIndex((s) => s.id === investmentData.investmentId)
        const goalAssociatedToIndex = transactionsData.value.goals
            .findIndex((g) => g.id === investmentData.goalId)
        const investmentIndexInGoal = transactionsData.value.goals[goalAssociatedToIndex].transactionsAssociated
            .findIndex((t) => t.id === investmentData.investmentId)

        if (investmentIndexInSaving !== -1 && investmentIndexInSaving !== -1 && investmentIndexInGoal !== -1) {
            transactionsData.value.savings.splice(investmentIndexInSaving, 1)
            transactionsData.value.goals[goalAssociatedToIndex].transactionsAssociated.splice(investmentIndexInGoal, 1)
            notificationManagement.displaySuccessMessage("Investment Deleted With Success")

            calculateSpecificGoalPercentage(investmentData.goalId)
        }
    }

    const deleteGoal = (goalData: GoalDataInterface): void => {
        setShouldCalculateDashboardData(true)
        const goalIndex = transactionsData.value.goals.findIndex((g) => g.id === goalData.id)
        if (goalIndex !== -1) {
            transactionsData.value.goals.splice(goalIndex, 1)
            transactionsData.value.goals.map((goal, index) => {
                if (goalData.index && goal.index > goalData.index) {
                    transactionsData.value.goals[index].index--
                }
            })
            notificationManagement.displaySuccessMessage("Goal Deleted With Success!")
        }
    }

    const createInvestmentTransaction = (investmentData: { goalId: number, transactionData: SavingTransactionInterface }) => {
        setShouldCalculateDashboardData(true)
        if (!investmentData) return
        const investmentIndex = transactionsData.value.goals.findIndex((g) => g.id === investmentData.goalId)
        if (investmentIndex === -1) return
        const lastSavingId = transactionsData?.value?.savings.length === 0 ? 1 : transactionsData?.value?.savings[transactionsData.value.savings.length - 1].id
        const investmentToPush = {
            id: transactionsData.value.savings.length === 0 ? 1 : 
            lastSavingId ? lastSavingId + 1 : 0
            ,
            ...investmentData.transactionData
        }
        transactionsData.value.goals[investmentIndex].transactionsAssociated.push(investmentToPush)
        transactionsData.value.savings.push(investmentToPush)
        calculateSpecificGoalPercentage(investmentData.goalId)
    }

    const updateGoal = (data: GoalDataInterface) => {
        setShouldCalculateDashboardData(true)
        const goalIndex = transactionsData.value.goals.findIndex((g) => g.id === data.id)
        transactionsData.value.goals[goalIndex] = data as Required<GoalDataInterface>;
        calculateSpecificGoalPercentage(data?.id || 0)
        notificationManagement.displaySuccessMessage("Goal Updated!")
    }

    const createGoal = (data: GoalDataInterface) => {
        setShouldCalculateDashboardData(true)
        if (!data) return
        const goalId = transactionsData.value.goals.length === 0 ? 1
            : transactionsData.value.goals[transactionsData.value.goals.length - 1].id + 1
        const goalIndex = transactionsData.value.goals.length === 0 ? 0 : goalsDataGetter.value[goalsDataGetter.value.length - 1].index + 1

        const goalToPush = {
            id: goalId,
            index: goalIndex,
            ...data,
            transactionsAssociated: [],
            percentageAchieved: 0,
            amountSaved: 0,
            amountPendent: parseInt(data.value)
        }

        transactionsData.value.goals.push(goalToPush)
        notificationManagement.displaySuccessMessage("Goal Created With Success!")
    }

    const setTransactionsAsPaid = (transactionId: number, transactionType: string): void => {
        setShouldCalculateDashboardData(true)
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

    const setTimeRange = (timeRange: timeRangeInterface): void => {
        if (!timeRange) return
        transactionsData.value.timeRange.startDate = timeRange.startDate
        transactionsData.value.timeRange.endDate = timeRange.endDate
        transactionsData.value.timeRange.name = timeRange.name
    }

    const updateTransaction = (transactionData: TransactionInterface): void => {
        setShouldCalculateDashboardData(true)
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

    const deleteTransaction = (transactionData: TransactionInterface): void => {
        setShouldCalculateDashboardData(true)
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

    const handleTransactionInstallment = (transaction: TransactionInterface): void => {
        setShouldCalculateDashboardData(true)
        const originalTransaction = transaction
        const originalTransactionDate = new Date(originalTransaction.notFormatedDate)
        const transactionAlreadyRegistered = 1
        const installmentAmount = originalTransaction?.installment || 0 - transactionAlreadyRegistered
        for (let i = 0; i < installmentAmount; i++) {
            let transactionYearBasedInInstallment = originalTransactionDate.getFullYear()
            let transactionMonthBasedInInstallment = originalTransactionDate.getMonth() + (i + 1)
            if (transactionMonthBasedInInstallment > 11) {
                const yearDivisor = Math.floor(transactionMonthBasedInInstallment / 12);
                transactionYearBasedInInstallment += yearDivisor
                transactionMonthBasedInInstallment = transactionMonthBasedInInstallment % 12;
            }

            const { notFormatedDate, date, id, installment,...transactionToPushRest } = originalTransaction
            const transactionToPush = {
                ...transactionToPushRest,
                id: originalTransaction.id + (i + 1),
                installment: originalTransaction?.installment || 0 - (i + 1),
                date: `01/${String(transactionMonthBasedInInstallment + 1).padStart(2, '0')}/${transactionYearBasedInInstallment}`,
                notFormatedDate: new Date(transactionYearBasedInInstallment, transactionMonthBasedInInstallment, 1)
            }

            if (originalTransaction.type === 'Income') {
                transactionsData.value.incomes.push(transactionToPush)
            } else {
                transactionsData.value.expenses.push(transactionToPush)
            }
        }
    }

    const setTransactionData = (transactionData: TransactionInterface): void => {
        setShouldCalculateDashboardData(true)
        switch (transactionData.type) {
            case 'Income':
                const incomeId = transactionsData.value.incomes.length === 0 ? 1 : transactionsData.value.incomes[transactionsData.value.incomes.length - 1].id + 1
                let incomeToPush = {
                    ...transactionData,
                    id: incomeId
                }

                if(incomeToPush.installment) {
                    incomeToPush.value = (parseFloat(incomeToPush.value) / incomeToPush.installment)
                        .toFixed(2)
                        .replace(".", ",")
                    handleTransactionInstallment(incomeToPush)
                }
                transactionsData.value.incomes.push(incomeToPush)
                break;
            case 'Expense':
                const expenseId = transactionsData.value.expenses.length === 0 ? 1 : transactionsData.value.expenses[transactionsData.value.expenses.length - 1].id + 1
                let expenseToPush = {
                    ...transactionData,
                    id: expenseId
                }

                if(expenseToPush?.installment) {
                    expenseToPush.value = (parseFloat(expenseToPush.value) / expenseToPush.installment)
                        .toFixed(2)
                        .replace(".", ",")
                    handleTransactionInstallment(expenseToPush)
                }
                transactionsData.value.expenses.push(expenseToPush)
                break;
        }

        notificationManagement.displaySuccessMessage("Transaction Created With Success")
    }

    const resetData = (): void => {
        transactionsData.value.expenses = []
        transactionsData.value.incomes = []
        transactionsData.value.savings = [] 
        transactionsData.value.goals = [] 
    
        setShouldCalculateDashboardData(true)
        notificationManagement.displaySuccessMessage("Personal Mode Applied! Enjoy")
    }

    return {
        resetData,
        defaultExpenses,
        transactionsData,
        shouldCalculateDashboardDataGetters,
        notOrderedSavingsData,
        notOrderedExpensesData,
        notOrderedIncomesData,
        transactionsTimeRangeGetter,
        goalsDataGetter,
        savingsDataGetter,
        expensesDataGetter,
        incomesDataGetter,
        transactionsDataGetter,
        setShouldCalculateDashboardData,
        orderGoalsArray,
        calculateSpecificGoalPercentage,
        calculateGoalsPercentages,
        deleteInvestment,
        deleteGoal,
        createInvestmentTransaction,
        updateGoal,
        createGoal,
        setTransactionsAsPaid,
        setTransactionData,
        deleteTransaction,
        updateTransaction,
        setTimeRange,
    }
}, { persist: true })