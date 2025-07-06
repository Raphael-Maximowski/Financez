<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import { unformat } from "v-money3";
import {notificationModule} from "@/Store/NotificationModule.ts";
import {transactionsModule} from "@/Store/TransactionsModule.ts";
import type { calendarMaskInterface, moneyMaskSettingsInterface  } from "@/Typescript/Interfaces/AssociatedToLibInterfaces";
import type { GoalDataInterface } from "@/Typescript/Interfaces/GoalInterfaces";
import type { GoalInterface } from "@/Typescript/Interfaces/TransactionsInterface";

const props = defineProps<{
  goalData: GoalInterface,
  modalData: any,
  modalInEditMode: boolean
}>()

const transactionsManagement = transactionsModule()
const notificationManagement = notificationModule()
const investmentsAssociatedToGoal = computed(() => props?.goalData?.transactionsAssociated || [])
const investmentValue = ref<string | number | null>(null)
const investmentMock = ref<string | null>(null)
const investmentDate = ref<string | null>(null)
const createInvestment = ref<boolean>(false)
const callendarState = ref<boolean>(false)
const historyState = ref<boolean>(props.modalInEditMode && props.modalData.associatedGoal === props.goalData.id)
const calendarMask: calendarMaskInterface = {
  modelValue: 'DD/MM/YYYY'
}
const moneyConfig: moneyMaskSettingsInterface = {
  decimal: ',',
  thousands: '.',
  prefix: 'U$ ',
  precision: 2,
  masked: true
}

const handleHistoryState = async (): Promise<void> => {
  createInvestment.value && ( await handleCreateInvestment())
  historyState.value = !historyState.value
}

const deleteInvestment = (investmentId: number): void => {
  const deleteInvestmentPayload = {
    goalId: props?.goalData?.id || 0,
    investmentId: investmentId
  }

  transactionsManagement.deleteInvestment(deleteInvestmentPayload)
  handleHistoryState()
}

const handleCallendarState = (): void => {
  callendarState.value = !callendarState.value
}

const handleCreateInvestment = async (): Promise<void> => {
  historyState.value && (await handleHistoryState())
  createInvestment.value = !createInvestment.value
  !createInvestment.value && callendarState.value && (handleCallendarState())
}

const saveInvestment = (): void => {
  if (!investmentValue.value || !investmentDate.value) return notificationManagement.displayErrorMessage("All Fields Are Required")
  const transactionValue = typeof investmentValue.value === 'string' ? parseFloat(investmentValue.value) : investmentValue.value
  if (transactionValue <= 0) {
    notificationManagement.displayErrorMessage("Insert a Valid Value")
    return
  }
  const [day, month, year] = investmentDate.value.split("/").map(Number);
  const investmentPayload = {
    goalId: props?.goalData?.id || 0,
    transactionData: {
      name: props?.goalData?.name || '',
      notFormatedDate: new Date(year, month - 1, day),
      date: investmentDate.value,
      value: String(investmentValue.value),
      associatedGoal: props?.goalData?.id || 0
    }
  }

  transactionsManagement.createInvestmentTransaction(investmentPayload)
  handleHistoryState()
}

watch(investmentMock, (newValue: string | null): void => {
  if (newValue !== null) {
      investmentValue.value = unformat(newValue, moneyConfig)
  }
})
</script>

<template>
  <div class="px-3 goal-card justify-content-between py-2 d-flex w-100">
    <p class="m-0">{{ goalData.name }}</p>
    <div class="d-flex gap-3">
      <i @click="handleHistoryState" class="bi bi-folder"></i>
      <i @click="handleCreateInvestment" class="bi bi-plus-square"></i>
    </div>
  </div>
  <div
      v-if="createInvestment"
      class="py-2 d-flex info-container px-3 align-items-center"
  >
    <div class="d-flex flex-grow-1 gap-2">
      <input v-money3="moneyConfig" v-model.lazy="investmentMock" class="form-control w-50" placeholder="Value"/>
      <div class="w-50 position-relative">
        <input :value="investmentDate" readonly  @click="handleCallendarState" class="w-100 form-control" placeholder="Date"/>
        <div
            v-if="callendarState"
            @mouseleave="handleCallendarState"
            class="position-absolute time-container">
          <VDatePicker
              expanded
              v-model.string="investmentDate"
              :masks="calendarMask"
              :min-date="new Date()"
              :color="'gray'"
              mode="date" />
        </div>
      </div>
    </div>
    <i @click="handleCreateInvestment" class="bi fs-6 bi-x-circle"></i>
    <i @click="saveInvestment" class="bi bi-check-circle"></i>
  </div>
  <div v-if="historyState" class="py-2 px-3 history-container">
    <div
        v-for="investment in investmentsAssociatedToGoal.sort((a, b) => new Date(b.notFormatedDate).getTime() - new Date(a.notFormatedDate).getTime())"
        :key="investment.id"
        class="d-flex w-100 align-items-center  justify-content-between"
    >
      <p class="mb-0">U$ {{ investment.value }}</p>
      <div class="d-flex align-items-center gap-3">
        <p class="mb-0">{{ investment.date }}</p>
        <i @click="deleteInvestment(investment?.id || -1)" class="bi bi-trash"></i>
      </div>

    </div>
    <p class="mb-0"
       v-if="investmentsAssociatedToGoal.length === 0">
      None Transactions Associated Were Found
    </p>
  </div>
</template>

<style scoped>
.time-container {
  width: 100%;
  top: calc(100% + 5px);
}

i {
  cursor: pointer;
}

.history-container p {
  font-size: 12px;
}

.info-container, .history-container {
  gap: 15px;
  border-bottom: 1px solid lightgray;
}

.goal-card:hover {
  background-color: rgba(211, 211, 211, 0.21);
}

.goal-card {
  border-bottom: 1px solid lightgray;
  transition: 0.3s;
}
</style>