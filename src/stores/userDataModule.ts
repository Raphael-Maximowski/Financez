import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {transactionMockUpData} from '@/data/transactionsData.ts'
import type {userDataModuleInterface} from "@/typescript/DashBoard/interfaces.ts";
import {toastfyModule} from "@/stores/toastfyModule.ts";
import {setTimeRangeBasedInActualDate} from "@/utils/formatToDate.ts";

export const userDataModule = defineStore('userData', () => {
    const toastManagement = toastfyModule()

    const userData = ref<userDataModuleInterface>({
        dashBoardData: [
            {title: 'Total Balance', amount: 0, percentage: 2.5, id: 1, route: 'Total Balance Management View'},
            {title: 'Expenses', amount: 0, percentage: 2.5, id: 2, route: 'Expenses Management View', transactionType: 'expense'},
            {title: 'Incomes', amount: 0, percentage: 2.5, id: 3, route: 'Incomes Management View', transactionType: 'income'},
            {title: 'Savings', amount: 0, percentage: 2.5, id: 4, route: 'Incomes Management View'}
        ],
        transactions: transactionMockUpData,
        tableFilters: {
            tableTitle: 'Pendent Transactions',
            typeTransaction: 'expense',
            state: 'pendent'
        },
        transactionsTimeRange: {
            startDate: '',
            endDate: ''
        }
    })

    const dashBoardDataGetter = computed(() => userData.value.dashBoardData)
    const transactionDataGetter = computed(() => userData.value.transactions)
    const transactionsTableFiltersGetter = computed(() => userData.value.tableFilters)
    const transactionsTimeRangeGetter = computed(() => userData.value.transactionsTimeRange)

    const setDashBoardData = () => {
        const timeRange = setTimeRangeBasedInActualDate(new Date(), 'month')

        userData.value.dashBoardData.forEach((data, index) => {
            userData.value.dashBoardData[index].amount = 0

            if (index > 0) {
                userData.value.transactions.forEach((transactionInArray) => {
                    if (transactionInArray.transactionType === data.transactionType
                        && transactionInArray.notFormatedTransactionDate >= timeRange.startDate
                        && transactionInArray.notFormatedTransactionDate <= timeRange.endDate
                    ) {
                        userData.value.dashBoardData[index].amount += transactionInArray.transactionValue
                    }

                })
            }
        })

        userData.value.dashBoardData[0].amount = userData.value.dashBoardData[2].amount - userData.value.dashBoardData[1].amount
    }

    const setTransactionsTimeRange = (newTimeRange) => {
        if (newTimeRange) {
            userData.value.transactionsTimeRange = newTimeRange
            return
        }
        toastManagement.errorToastMessage("Error Occurred to Change Table Filter!")
    }

    const setTableFilters = (newFilter) => {
        if (newFilter) {
            userData.value.tableFilters = newFilter
            return
        }

        toastManagement.errorToastMessage("Error Occurred to Change Table Filter!")
    }

    const createNewTransaction = (transactionData) => {
        const transactionToPush = ref(transactionData)
        transactionToPush.value = {
            ...transactionToPush.value,
            id: userData.value.transactions.length > 0 ? userData.value.transactions[userData.value.transactions.length - 1].id + 1 : 1
        }
        userData.value.transactions.push(transactionToPush.value)
        toastManagement.succesToastMessage("Transaction Created")
    }

    const updateTransaction = (transactionData) => {
        const index = userData.value.transactions.findIndex((transactionInArray) => transactionInArray.id == transactionData.id)
        if (index === -1) return toastManagement.errorToastMessage("An Error Ocurred while Updating Transaction")

        userData.value.transactions.splice(index, 1, transactionData)
        toastManagement.succesToastMessage("Transaction Update")
    }

    const deleteTransaction = (transactionId) => {
        const index = userData.value.transactions.findIndex((transactionInArray) => transactionInArray.id == transactionId)
        if (index === -1) return toastManagement.errorToastMessage("An Error Ocurred while Deleting Transaction")

        userData.value.transactions.splice(index, 1)
        toastManagement.succesToastMessage("Transaction Deleted")
    }


    return {
        userData,
        dashBoardDataGetter,
        transactionDataGetter,
        createNewTransaction,
        updateTransaction,
        deleteTransaction,
        setTableFilters,
        transactionsTableFiltersGetter,
        setTransactionsTimeRange,
        transactionsTimeRangeGetter,
        setDashBoardData
    }
})