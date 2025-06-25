<script setup lang="ts">
import GoalInvestmentCard from "@/Components/Cards/GoalInvestmentCard.vue";
import {modalModule} from "@/Store/ModalModule.ts";
import {transactionsModule} from "@/Store/TransactionsModule.ts";
import {computed, onMounted} from "vue";

const modalManagement = modalModule()
const transactionsManagement = transactionsModule()
const modalData = computed(() => modalManagement.modalDataGetter)
const modalInEditMode = computed(() => (!!modalData.value))
const goalsData = computed(() => transactionsManagement.goalsDataGetter)

const closeModal = () => {
  modalManagement.setModalState()
}
</script>

<template>
  <div class="modal d-block modalBackground">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header border-0 d-flex justify-content-between">
          <h3 class="m-0 fs-4 fw-bold">Register Investment</h3>
          <i @click="closeModal" class="bi bi-x-lg"></i>
        </div>
        <div class="p-0 mx-3 modal-body">
          <GoalInvestmentCard
              v-for="goalData in goalsData"
              :key="goalData.id"
              :goalData="goalData"
              :modalInEditMode="modalInEditMode"
              :modalData="modalData"
          />
        </div>
        <div class="modal-footer border-0">
          <button @click="closeModal" type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bi-x-lg {
  cursor: pointer;
}

.modal-body {
  border-top: 1px solid lightgray;
}
</style>