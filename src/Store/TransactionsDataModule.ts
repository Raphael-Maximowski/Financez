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
            endDate: '',
            name: ''
        }
    })

    const goalsDataGetter = computed(() => transactionsData.value.goals.sort((a , b) => a.index - b.index))

    const transactionsTimeRangeGetter = computed(() => transactionsData.value.timeRange.name)

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

    const orderGoalsArray = (event) => {
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

    const calculateSpecificGoalPercentage = (goalId) => {
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

    const calculateGoalsPercentages = () => {
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

    const deleteInvestment = (investmentData) => {
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

    const deleteGoal = (goalData) => {
        const goalIndex = transactionsData.value.goals.findIndex((g) => g.id === goalData.id)
        if (goalIndex !== -1) {
            transactionsData.value.goals.splice(goalIndex, 1)
            transactionsData.value.goals.map((goal, index) => {
                if (goal.index > goalData.index) {
                    transactionsData.value.goals[index].index--
                }
            })
            notificationManagement.displaySuccessMessage("Goal Deleted With Success!")
        }
    }

    const createInvestmentTransaction = (investmentData) => {
        if (!investmentData) return
        const investmentIndex = transactionsData.value.goals.findIndex((g) => g.id === investmentData.goalId)
        if (investmentData === -1) return
        const investmentToPush = {
            id: transactionsData.value.savings.length === 0 ? 1 : transactionsData.value.savings[transactionsData.value.savings.length - 1].id ++,
            ...investmentData.transactionData
        }
        transactionsData.value.goals[investmentIndex].transactionsAssociated.push(investmentToPush)
        transactionsData.value.savings.push(investmentToPush)
        calculateSpecificGoalPercentage(investmentData.goalId)
    }

    const updateGoal = (data) => {
        const goalIndex = transactionsData.value.goals.findIndex((g) => g.id === data.id)
        transactionsData.value.goals[goalIndex] = data
        calculateSpecificGoalPercentage(data.id)
        notificationManagement.displaySuccessMessage("Goal Updated!")
    }

    const createGoal = (data) => {
        if (!data) return
        const goalId = transactionsData.value.goals.length === 0 ? 1
            : transactionsData.value.goals[transactionsData.value.goals.length - 1].id + 1
        const goalIndex = goalsDataGetter.value[goalsDataGetter.value.length - 1].index + 1

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
        transactionsData.value.timeRange.name = timeRange.name
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
        transactionsTimeRangeGetter,
        orderGoalsArray,
        calculateSpecificGoalPercentage,
        calculateGoalsPercentages,
        deleteInvestment,
        deleteGoal,
        createInvestmentTransaction,
        updateGoal,
        createGoal,
        goalsDataGetter,
        setTransactionsAsPaid,
        savingsDataGetter,
        setTransactionData,
        deleteTransaction,
        updateTransaction,
        expensesDataGetter,
        incomesDataGetter,
        transactionsDataGetter,
        setTimeRange
    }

})