<script setup lang="ts">
import TransactionsMetricsDropDown from "@/Components/DropDowns/TransactionsMetricsDropDown.vue";
import TransactionsTables from "@/Components/Tables/TransactionsTables.vue";
import MetricsLine from "@/Components/Charts/MetricsLine.vue";
import MetricDoughnut from "@/Components/Charts/MetricDoughnut.vue";
import Draggable from "vuedraggable";
import {computed, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import GoalCard from "@/Components/Card/GoalCard.vue";
import {transactionsDataModule} from "@/Store/TransactionsDataModule.ts";
import CreateGoal from "@/Components/Modals/CreateOrUpdateGoal.vue";
import {modalManagementModule} from "@/Store/ModalManagementModule.ts";
import InvestmentModal from "@/Components/Modals/InvestmentModal.vue";

const transactionsManagement = transactionsDataModule()
const modalManagement = modalManagementModule()
const router = useRouter()
const route = useRoute()
const modalName = computed(() => modalManagement.modalNameGetter)
const goalsDataComputed = computed(() => transactionsManagement.goalsDataGetter)
const goalsData = ref(goalsDataComputed.value.sort((a, b) => a.index - b.index));
const inSavingsView = computed(() => route.name === 'Savings View')

const openCreateOrUpdateGoal = (goalData = null) => {
  modalManagement.setModalState({
    state: true,
    name: 'Create Or Update Goal',
    ...(goalData && { extraData: goalData })
  })
}

const registerGoalMovement = (event) => {
  transactionsManagement.orderGoalsArray(event.moved)
}

const setValueToReference = () => {
  goalsData.value = goalsDataComputed.value
}

const redirectToReportsView = () => {
  router.push({ name: 'Reports View' })
}

watch(goalsDataComputed, () => {
  setValueToReference()
}, { deep: true })
</script>

<template>
  <div class="w-100 h-100 d-flex flex-column">

    <div class="w-100 align-items-end justify-content-between d-flex flex-wrap">
      <TransactionsMetricsDropDown />
      <button @click="redirectToReportsView" class="btn btn-dark">Reports</button>
    </div>

    <div class="content-container d-xxl-flex  flex-grow-1 pt-4">
      <div class="d-flex flex-column left-container-content col-xxl-9 col-12 h-100">
        <div class="w-100 h-50">
          <MetricsLine/>
        </div>
        <div class="table-container w-100 h-50">
          <TransactionsTables/>
        </div>
      </div>
      <div class="col-xxl-3 col-12 h-100">
        <div v-if="!inSavingsView" class="d-flex w-100 h-100 align-items-center justify-content-center">
          <MetricDoughnut/>
        </div>
        <div class="h-100 ps-xxl-3 card-wrapper" v-else>
          <button @click="openCreateOrUpdateGoal(null)" class="btn btn-dark w-100  mb-3">+ Create Goal</button>
          <draggable
              v-model="goalsData"
              tag="div"
              handle=".bi-three-dots-vertical"
              @change="event=> registerGoalMovement(event)"
              :item-key="key => key"
              animation="350"
          >
            <template #item="{ element }">
              <div>
                <GoalCard
                    @click="openCreateOrUpdateGoal(element)"
                    :goal="element" />
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>

  <InvestmentModal v-if="modalName === 'Investment Modal'" />
  <CreateGoal v-if="modalName == 'Create Or Update Goal'" />
</template>

<style scoped>


.card-wrapper {
  padding-top: 32px;
}

.left-container-content {
  gap: 20px;
}

.content-container {
  height: 75vh;
}

.table-container {
  max-height: 100%;
}
</style>