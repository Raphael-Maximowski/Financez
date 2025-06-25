<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import { unformat } from "v-money3";
import {notificationModule} from "@/Store/NotificationModule.ts";
import {transactionsModule} from "@/Store/TransactionsModule.ts";

const props = defineProps({
  goalData: { type: Object, required: true },
  modalData: { type: Object, required: true },
  modalInEditMode: { type: Boolean, required: true }
})

const investmentsAssociatedToGoal = computed(() => props?.goalData?.transactionsAssociated || [])
const transactionsManagement = transactionsModule()
const notificationManagement = notificationModule()
const investmentValue = ref()
const investmentMock = ref()
const investmentDate = ref()
const createInvestment = ref(false)
const callendarState = ref(false)
const historyState = ref(props.modalInEditMode && props.modalData.associatedGoal === props.goalData.id)
const calendarMask = {
  modelValue: 'DD/MM/YYYY'
}
const moneyConfig = {
  decimal: ',',
  thousands: '.',
  prefix: 'U$ ',
  precision: 2,
  masked: true
}

const handleHistoryState = async () => {
  createInvestment.value && ( await handleCreateInvestment())
  historyState.value = !historyState.value
}

const deleteInvestment = (investmentId) => {
  const deleteInvestmentPayload = {
    goalId: props.goalData.id,
    investmentId: investmentId
  }

  transactionsManagement.deleteInvestment(deleteInvestmentPayload)
  handleHistoryState()
}

const handleCallendarState = () => {
  callendarState.value = !callendarState.value
}

const handleCreateInvestment = async () => {
  historyState.value && (await handleHistoryState())
  createInvestment.value = !createInvestment.value
  !createInvestment.value && callendarState.value && (handleCallendarState())
}

const saveInvestment = () => {
  if (!investmentValue.value || !investmentDate.value) return notificationManagement.displayErrorMessage("All Fields Are Required")
  const [day, month, year] = investmentDate.value.split("/").map(Number);
  const investmentPayload = {
    goalId: props.goalData.id,
    transactionData: {
      name: props.goalData.name,
      notFormatedDate: new Date(year, month - 1, day),
      date: investmentDate.value,
      value: investmentValue.value,
      associatedGoal: props.goalData.id
    }
  }

  transactionsManagement.createInvestmentTransaction(investmentPayload)
  handleHistoryState()
}

watch(investmentMock, (newValue) => {
  investmentValue.value = unformat(newValue, moneyConfig)
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
        v-for="investment in investmentsAssociatedToGoal.sort((a, b) => b.notFormatedDate - a.notFormatedDate)"
        :key="investment.id"
        class="d-flex w-100 align-items-center  justify-content-between"
    >
      <p class="mb-0">U$ {{ investment.value }}</p>
      <div class="d-flex align-items-center gap-3">
        <p class="mb-0">{{ investment.date }}</p>
        <i @click="deleteInvestment(investment.id)" class="bi bi-trash"></i>
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