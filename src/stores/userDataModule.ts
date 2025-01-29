import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {userDataModuleInterface} from "@/typescript/DashBoard/interfaces.ts";
import {toastfyModule} from "@/stores/toastfyModule.ts";

export const userDataModule = defineStore('userData', () => {
    const toastManagement = toastfyModule()

    const userData = ref<userDataModuleInterface>({
        dashBoardData: [
            {title: 'Total Balance', amount: 1350, percentage: 2.5, id: 1},
            {title: 'Expenses', amount: 1350, percentage: 2.5, id: 2},
            {title: 'Incomes', amount: 1350, percentage: 2.5, id: 3},
            {title: 'Savings', amount: 1350, percentage: 2.5, id: 4}
        ],
        transactions: [
            {
                id: 1,
                transactionDate: "20/02/2025",
                transactionDescription: "Ola",
                transactionInstallment: "5",
                transactionState: "pendent",
                transactionTitle: "Test Transaction 1",
                transactionType: "expense",
                transactionValue: 150
            },
            {
                id: 2,
                transactionDate: "20/02/2025",
                transactionDescription: "Ola",
                transactionInstallment: "5",
                transactionState: "pendent",
                transactionTitle: "Test Transaction 2",
                transactionType: "expense",
                transactionValue: 150
            },
            {
                id: 3,
                transactionDate: "20/02/2025",
                transactionDescription: "Ola",
                transactionInstallment: "5",
                transactionState: "pendent",
                transactionTitle: "Test Transaction 3",
                transactionType: "expense",
                transactionValue: 150
            },
            {
                id: 4,
                transactionDate: "20/02/2025",
                transactionDescription: "Ola",
                transactionInstallment: "5",
                transactionState: "pendent",
                transactionTitle: "Test Transaction 4",
                transactionType: "expense",
                transactionValue: 150
            },
            {
                id: 5,
                transactionDate: "20/02/2025",
                transactionDescription: "Ola",
                transactionInstallment: "5",
                transactionState: "pendent",
                transactionTitle: "Test Transaction 5",
                transactionType: "expense",
                transactionValue: 150
            },

        ]
    })

    const dashBoardDataGetter = computed(() => userData.value.dashBoardData)
    const transactionDataGetter = computed(() => userData.value.transactions)

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
        deleteTransaction
    }
})