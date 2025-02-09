<script setup lang="ts">
import TransactionCard from "@/components/Cards/TransactionCard.vue";
import {modalModule} from "@/stores/modalModule.ts";
import {useRoute} from "vue-router";
import {computed, onMounted, ref, watch} from "vue";
import {userDataModule} from "@/stores/userDataModule.ts";
import type {transactionDataInterface, transactionsFiltersInterface} from "@/typescript/DashBoard/interfaces.ts";
import {userConfigModule} from "@/stores/userConfig.ts";

const modalManagement: any = modalModule()
const userDataManagement: any = userDataModule()
const userConfigManagement = userConfigModule()
const userWidthReference = computed(() => userConfigManagement.userWidthGetter)
const route = useRoute()
const transactionsData = computed<transactionDataInterface[]>(() => userDataManagement.transactionDataGetter)
const transactionsFiltered = ref([])
const transactionsFilters = computed(() => userDataManagement.transactionsTableFiltersGetter)
const transactionsTimeRangeReference = computed(() => userDataManagement.transactionsTimeRangeGetter)

const openTransactionsModal = (transactionToSetInModal: transactionDataInterface | undefined = undefined): void => {
  const modalPayload = {
    modalName: 'transactions',
    ...(transactionToSetInModal && { modalExtendedData: transactionToSetInModal })
  }
  modalManagement.handleModalState(modalPayload)
}

const filterTransactionsData = () => {
  const transactionsMockUp = []
  transactionsData.value.forEach((transactionInArray) => {
    if (transactionsFilters.value.typeTransaction.includes(transactionInArray.transactionType)
        && transactionsFilters.value.state.includes(transactionInArray.transactionState)
        && transactionInArray.notFormatedTransactionDate >= transactionsTimeRangeReference.value.startDate
        && transactionInArray.notFormatedTransactionDate <= transactionsTimeRangeReference.value.endDate
    ) {
      transactionsMockUp.push(transactionInArray)
    }
  })

  transactionsFiltered.value = transactionsMockUp
}

onMounted(() => {
  filterTransactionsData()
})

watch([transactionsData, transactionsFilters, transactionsTimeRangeReference], () => {
  filterTransactionsData()
})
</script>

<template>
  <div :style="{ width: route.name === 'DashBoard View' ? 'calc(100% - 15px)' : '100%' }"  class="d-flex flex-column h-100 bg-white rounded-2 table-container">
    <div class="px-4 table-header d-sm-flex justify-content-between align-items-center">
      <p class="py-2 m-0 fw-bold fs-5">{{ transactionsFilters.tableTitle }}</p>
      <button @click="() => openTransactionsModal()" type="button" class="mb-2 mb-sm-0  btn btn-dark py-1">
        Add Transaction <span class="ms-2">+</span>
      </button>
    </div>

    <div class="px-4 flex-grow-1 table-content overflow-y-auto">
      <div v-if="transactionsFiltered.length > 0">
        <TransactionCard
            v-for="transaction in transactionsFiltered"
            :key="transaction.id"
            :transaction="transaction"
            @click="openTransactionsModal(transaction)" />
      </div>

      <div class="w-100 h-100 p-5 " v-else>
        <div class="w-100 dashed-container d-flex justify-content-center align-items-center  h-100 ">
          <img v-if="userWidthReference > 600" class="ghost-image" src="@/assets/images/ghostImage.png" />
          <div>
            <p class="fs-3">No {{ transactionsFilters.tableTitle }} Were Found!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashed-container {
  border: 2px dashed lightgray;
}

.ghost-image {
  width: 200px;
  height:200px;
}


.table-content::-webkit-scrollbar {
  width: 11px;
}

.table-content::-webkit-scrollbar-track {
  background: white;
  border-radius: 20px;
}

.table-content::-webkit-scrollbar-thumb {
  width: 11px;
  background-color: #1B557A24;
  border-radius: 20px;
}


.table-container {
  border: 1px solid lightgray;
}

.btn-dark {
  font-size: 14px;
}

.table-header {
  border-bottom: 1px solid lightgray;
}
</style>