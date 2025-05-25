<script setup lang="ts">
import {modalManagementModule} from "@/Store/ModalManagementModule.ts";
import {computed, onMounted, ref, watch} from "vue";
import {useForm} from "vee-validate";
import * as yup from 'yup';
import {transactionsDataModule} from "@/Store/TransactionsDataModule.ts";
import {notificationModule} from "@/Store/NotificationModule.ts";
import { unformat, format } from "v-money3";

const modalManagement = modalManagementModule()
const modalData = computed(() => modalManagement.modalDataGetter)
const modalInEditMode = modalData.value ? true : false
const transactionsManagement = transactionsDataModule()
const notificationManagement = notificationModule()
const stateOptions: string[] = [ 'Pendent', 'Paid']
const calendarState = ref<boolean>(false)
const installmentState = ref<boolean>(false)
const valueMockUp = ref()

const moneyConfig = {
  decimal: ',',
  thousands: '.',
  prefix: 'U$ ',
  precision: 2,
  masked: true
}

const validationSchema = yup.object({
  name: yup.string().required("Name Field is Required"),
  value: yup.string().required("Value Field is Required"),
  type: yup.string().required("Type Field is Required"),
  state: yup.string().required("State Field is Required"),
  installment: yup.number().optional().min(1, "Insert a Valid Installment"),
  date: yup.string().required("Date Field is Required"),
  description: yup.string().optional()
})

const calendarMask = {
  modelValue: 'DD/MM/YYYY'
}

const { defineField, validate, setValues } = useForm({
  validationSchema
})

const [name] = defineField('name')
const [value] = defineField('value')
const [type] = defineField('type')
const [state] = defineField('state')
const [installment] = defineField('installment')
const [date] = defineField('date')
const [description] = defineField('description')

const setCalendarState = (state) => {
  calendarState.value = state
}

const closeModal = () => {
  modalManagement.setModalState({state: false})
}

const cancelInstallmentState = () => {
  installmentState.value = false
  setValues({
    installment: null
  })
}

const validateFormData = async ():Promise<boolean> => {
  const isValid = await validate()
  if (isValid.valid) return true
  let errorsData = isValid.errors
  errorsData = Object.values(errorsData)
  notificationManagement.displayErrorMessage(errorsData[0])
  return false
}

const createTransaction = async () => {
  if (!await validateFormData()) return

  const [day, month, year] = date.value.split("/").map(Number);

  const payload = {
    name: name.value,
    value: value.value.replace('.', ','),
    type: type.value,
    state: state.value,
    notFormatedDate: new Date(year, month - 1, day),
    date: date.value,
    ...(installment.value && { installment: installment.value }),
    ...(description.value && { description: description.value })
  }

  transactionsManagement.setTransactionData(payload)
  closeModal()
}

const deleteTransaction = () => {
  if (!modalData.value) return
  transactionsManagement.deleteTransaction(modalData.value)

  closeModal()
}

const editTransaction = () => {
  if (!modalData.value) return

  const [day, month, year] = date.value.split("/").map(Number);

  const payload = {
    id: modalData.value.id,
    name: name.value,
    value: value.value.replace('.', ','),
    type: type.value,
    state: state.value,
    notFormatedDate: new Date(year, month - 1, day),
    date: date.value,
    ...(installment.value && { installment: installment.value }),
    ...(description.value && { description: description.value }),
  }

  transactionsManagement.updateTransaction(payload)
  closeModal()
}


const setVariablesToEdit = () => {
  if (!modalInEditMode) return
  valueMockUp.value = format(modalData.value.value, moneyConfig)
  setValues({
    name: modalData.value.name,
    value: modalData.value.value,
    type: modalData.value.type,
    state: modalData.value.state,
    date: modalData.value.date,
    ...(modalData.value.description && {description: modalData.value.description} ),
    ...(modalData.value.installment && {installment: modalData.value.installment} )
  })

  modalData.value.installment && (installmentState.value = true)
}

watch(valueMockUp, (newValue) => {
  setValues({
    value: unformat(newValue, moneyConfig)
  })
})

onMounted(() => {
  setVariablesToEdit()
})
</script>

<template>
  <div class="modal modalBackground d-block">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content border-0 px-4 py-5">
        <div class="modal-header-container pb-4 d-flex align-items-center justify-content-between">
          <h3 class="m-0 fs-4">{{ modalInEditMode ? 'Edit' : 'Create'}} Transaction</h3>
          <i @click="closeModal" class="bi bi-x-lg"></i>
        </div>

        <div class="py-4 modal-body-container">
          <div class="input-section w-100 gap-between-inputs d-flex">
            <div class="w-75">
              <label>Name: </label>
              <input v-model="name" class="form-control w-100"/>
            </div>
            <div class="w-25">
              <label>Value: </label>
              <input v-money3="moneyConfig" v-model.lazy="valueMockUp" class="form-control w-100"/>
            </div>
          </div>

          <div class="input-section d-flex w-100 gap-between-inputs">
            <div class="w-50">
              <label>Type: </label>
              <select v-model="type" class="w-100 form-select">
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            <div class="w-50">
              <label>State: </label>
              <select v-model="state" class="w-100 form-select">
                <option
                    v-for="(option, index) in stateOptions"
                    :key="index"
                > {{ option }} </option>
              </select>
            </div>
          </div>

          <div class="w-100 d-flex gap-between-inputs input-section">
            <div class="w-50">
              <div v-if="!installmentState">
                <label>Installment: </label>
                <select :disabled="modalInEditMode" v-model="installmentState" class="w-100 form-select">
                  <option :value="false">Discarted</option>
                  <option :value="true">Used</option>
                </select>
              </div>

              <div v-else>
                <div class="opacity-100 w-100">
                  <label>Installment: </label>
                  <div class="d-flex align-items-center">
                    <input :disabled="modalInEditMode" v-model="installment" class="form-control w-100" type="number">
                    <i @click="!modalInEditMode && (cancelInstallmentState())" class="ms-2 bi bi-x-circle"></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-50 position-relative">
              <label>Date: </label>
              <input @click="setCalendarState(true)" readonly class="form-control" :value="date" />

              <div v-if="calendarState" @mouseleave="setCalendarState(false)" class="mt-2 w-100 position-absolute v-calendar-container">
                <VDatePicker
                    expanded
                    v-model.string="date"
                    :masks="calendarMask"
                    :min-date="new Date()"
                    :color="'gray'"
                    mode="date" />
              </div>
            </div>
          </div>

          <div class="input-section w-100">
            <label>Description: </label>
            <textarea v-model="description" class="form-control" rows="8"/>
          </div>
        </div>

        <div class="pt-4 footer-container d-flex justify-content-end">
          <div v-if="modalInEditMode">
            <button @click="deleteTransaction" class="btn btn-danger">Delete</button>
            <button @click="editTransaction" class="ms-2 btn btn-dark">Edit</button>
          </div>

          <button v-else @click="createTransaction" class="btn btn-dark">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-calendar-container {
  text-outline: 100%;
}

.modal-header-container, .modal-body-container {
  border-bottom: 1px solid lightgray;
}

.input-section {
  margin: 0px 0px 20px 0px;
}

.footer-container, .gap-between-inputs {
  gap: 10px;
}

.bi-x-lg {
  cursor: pointer;
}
</style>