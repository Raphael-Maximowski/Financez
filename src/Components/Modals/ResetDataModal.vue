<script lang="ts" setup>
import { transactionsModule } from '@/Store/TransactionsModule.ts'
import { modalModule } from '@/Store/ModalModule.ts'

const transactionsMagement = transactionsModule()
const modalManagement = modalModule()

const resetData = (): void => {
    transactionsMagement.resetData()
    closeModal()
}

const closeModal = (): void => {
  modalManagement.setModalState()
}

</script>

<template>
    <div class="modal modalBackground d-block">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="border-0 rounded-4 modal-content py-3">
      <div class="modal-header position-relative d-flex justify-content-center border-0">
        <h5 class="mb-0 modal-title fw-bold" id="exampleModalLongTitle">Switch to Personal Mode?</h5>
        <button @click="closeModal" type="button" class="close-button position-absolute border-0 bg-transparent" data-dismiss="modal" aria-label="Close">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="modal-body d-flex flex-column gap-3 px-5 text-center">
        <p class="mb-0">You’re currently using the demo version. Would you like to reset all data and start using the app personally?</p>
        <p class="mb-0 small-text">Obs: Your data will be saved <span class="fw-bold">locally</span> and will not be shared with anyone.</p>
    </div>
      <div class="modal-footer d-flex justify-content-center border-0">
        <button @click="resetData" class="btn btn-dark">Reset & Use Personally</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.small-text {
    font-size: 12px;
}

.close-button {
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
}
</style>