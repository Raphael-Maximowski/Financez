<script lang="ts" setup>
import {modalModule} from "@/stores/modalModule.ts";
import {ref, watch} from "vue";
import * as yup from 'yup'
import {useForm} from "vee-validate";
import {userDataModule} from "@/stores/userDataModule.ts";
import {toastfyModule} from "@/stores/toastfyModule.ts";
import { unformat } from "v-money3";
import type {
  calendarMaskInterface,
  modalDataInterface,
  moneyConfigInterface, transactionDataInterface
} from "@/typescript/DashBoard/interfaces.ts";

const modalManagement: any = modalModule()
const toastManagement: any = toastfyModule()
const userDataManagement: any = userDataModule()
const modalData: modalDataInterface = modalManagement.modalDataGetter
const transactionValueMockUp = ref<string>()
const calendarState = ref<boolean>()
const installmentState = ref<boolean>()
const customInstallmentValue = ref<string>()
const modalInEditMode = ref<boolean>(false)
const transactionToEditMockUp = ref<transactionDataInterface | null>(null)
const transactionInstallmentPossibleValues: string[] = ['1', '2', '3', '4', '5', '999', 'custom']

const moneyConfig: moneyConfigInterface = {
  prefix: 'U$',
  thousands: '.',
  decimal: ',',
  precision: 2,
  disableNegative: true,
  disabled: false,
  min: 0,
  masked: false,
  minimumNumberOfCharacters: 0,
  shouldRound: true,
  focusOnRight: false,
}

const calendarMask = ref<calendarMaskInterface>({
  modelValue: 'DD/MM/YYYY'
})

const validationSchema = yup.object({
  transactionTitle: yup.string().required("Title Field Is Required"),
  transactionValue: yup.number().required("Value Field Is Required"),
  transactionType: yup.string().required("Type Is Required"),
  transactionState: yup.string().required("Status Field Is Required"),
  transactionDate: yup.string().required("Date Field Is Required"),
  transactionInstallment: yup.mixed().optional(),
  transactionDescription: yup.string().optional()
})

const { defineField, validate, setValues } = useForm({
  validationSchema
})

const [ transactionTitle ] = defineField('transactionTitle')
const [ transactionValue ] = defineField('transactionValue')
const [ transactionType ] = defineField('transactionType')
const [ transactionState ] = defineField('transactionState')
const [ transactionDate ] = defineField('transactionDate')
const [ transactionInstallment ] = defineField('transactionInstallment')
const [ transactionDescription ] = defineField('transactionDescription')

const closeModal = ():void => {
  modalManagement.handleModalState()
}

const setDataToEdit = (transactionToEdit: transactionDataInterface): void => {
  setValues({
    transactionTitle: transactionToEdit.transactionTitle,
    transactionDate: transactionToEdit.transactionDate,
    transactionState: transactionToEdit.transactionState,
    transactionType: transactionToEdit.transactionType,
    transactionValue: transactionToEdit.transactionValue
  })

  transactionValue.value = transactionToEdit.transactionValue
  if (Number.isInteger(transactionToEdit.transactionValue)) {
    transactionValueMockUp.value = `U$${transactionToEdit.transactionValue},00`
  } else {
    transactionValueMockUp.value = `U$${transactionToEdit.transactionValue}`
  }

  if (transactionToEdit.transactionInstallment ) {
    if (transactionInstallmentPossibleValues.includes(transactionToEdit.transactionInstallment)) {
      installmentState.value = true
      setValues({
        transactionInstallment: transactionToEdit.transactionInstallment
      })
      return
    }

    installmentState.value = true
    setValues({
      transactionInstallment: 'custom'
    })
    customInstallmentValue.value = transactionToEdit.transactionInstallment
  }
}

const clearVariables = (): void => {
  setValues({
    transactionTitle: '',
    transactionValue: 'U$0,00',
    transactionType: 'expense',
    transactionState: 'paid',
    transactionDate: new Date().toLocaleDateString('pt-BR'),
    transactionInstallment: 1,
    transactionDescription: ''
  })

  transactionValueMockUp.value = "U$0,00"
  transactionToEditMockUp.value = null
  installmentState.value = false
  modalInEditMode.value = false
}

const validateTransactionData = async (): boolean => {
  const isValid = await validate()
  if (isValid.valid && transactionValue.value > 0 && transactionValue.value !== 'U$0,00') return true

  if (transactionValue.value <= 0 || transactionValue.value === 'U$0,00') {
    toastManagement.errorToastMessage("Insert a Valid Transaction Value")
    return false
  }

  const errorsObject = isValid.errors
  const errorsArray = Object.values(errorsObject)
  toastManagement.errorToastMessage(errorsArray[0])
  return false
}

const updateTransaction =  async (): void => {
  if (await validateTransactionData()) {
    const payload = {
      id: transactionToEditMockUp.value.id,
      transactionTitle: transactionTitle.value,
      transactionValue: parseFloat(transactionValue.value),
      transactionType: transactionType.value,
      transactionState: transactionState.value,
      transactionDate: transactionDate.value,
      ...(transactionDescription.value && { transactionDescription: transactionDescription.value }),
      ...(transactionInstallment.value === 'custom' && installmentState.value && { transactionInstallment: customInstallmentValue.value }),
      ...(transactionInstallment.value !== 'custom' && installmentState.value && { transactionInstallment: transactionInstallment.value })
    }

    userDataManagement.updateTransaction(payload)
    closeModal()
  }
}

const deleteTransaction = (): void => {
  console.log(transactionToEditMockUp.value.id)
  if (transactionToEditMockUp.value.id) {
    userDataManagement.deleteTransaction(transactionToEditMockUp.value.id)
    closeModal()
    return
  }

  toastManagement.errorToastMessage("Invalid Transaction To Delete")
}

const createTransaction = async (): void => {
  if (await validateTransactionData()) {
    const payload = {
      transactionTitle: transactionTitle.value,
      transactionValue: parseFloat(transactionValue.value),
      transactionType: transactionType.value,
      transactionState: transactionState.value,
      transactionDate: transactionDate.value,
      ...(transactionDescription.value && { transactionDescription: transactionDescription.value }),
      ...(transactionInstallment.value === 'custom' && installmentState.value && { transactionInstallment: customInstallmentValue.value }),
      ...(transactionInstallment.value !== 'custom' && installmentState.value && { transactionInstallment: transactionInstallment.value })
    }
    userDataManagement.createNewTransaction(payload)
    closeModal()
    return
  }
}

watch(modalData, (newValue: modalDataInterface): void => {
  if (newValue.modalExtendedData) {
    transactionToEditMockUp.value = newValue.modalExtendedData
    modalInEditMode.value = true
    setDataToEdit(newValue.modalExtendedData)
    return
  }

  clearVariables()
})

watch(transactionValueMockUp, (newValue: string): void => {
  setValues({
    transactionValue: unformat(newValue, moneyConfig)
  })
})

</script>

<template>
  <div
      :class="[ modalData.modalState && modalData.modalName === 'transactions' ? 'd-block' : '', 'modal modalBackground']">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content px-4 border-0">
        <div class="modal-header px-0 d-flex justify-content-between">
          <h5 class="modal-title">Transaction Management</h5>
          <i @click="closeModal" class="bi bi-x-lg"></i>
        </div>
        <div class="modal-body px-0">

          <form @submit.prevent=" modalInEditMode ? updateTransaction() : createTransaction()">
            <div class="d-flex input-container w-100">
              <input
                  v-model="transactionTitle"
                  placeholder="Transaction Title"
                  class="w-75 form-control"/>
              <input
                  v-money3="moneyConfig"
                  v-model.lazy="transactionValueMockUp"
                  placeholder="Value"
                  class="w-25 form-control"/>
            </div>

            <div class="d-flex input-container">
              <select
                  v-model="transactionType"
                  class="form-select w-50 my-3">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <div class="d-flex w-50 align-items-center">
                <input v-model="installmentState"  type="checkbox"/>

                <input
                    v-if="!installmentState"
                    readonly
                    placeholder="Installment Sale"
                    class="ms-2 form-control"
                />

                <select
                    v-if="installmentState"
                    class="ms-2 form-select"
                    v-model="transactionInstallment"
                >
                  <option value="1">1x</option>
                  <option value="2">2x</option>
                  <option value="3">3x</option>
                  <option value="4">4x</option>
                  <option value="5">5x</option>
                  <option value="999">Fixed</option>
                  <option value="custom">Custom</option>
                </select>

                <input
                    v-model="customInstallmentValue"
                    type="number"
                    placeholder="1"
                    v-if="transactionInstallment === 'custom'"
                    class="form-control ms-2"
                />
              </div>
            </div>

            <div class="d-flex input-container mb-3">
              <div class="d-flex w-50">
                <select v-model="transactionState" class="form-select">
                  <option value="paid">Paid</option>
                  <option value="pendent">Pendent</option>
                </select>
              </div>

              <div class="position-relative w-50">
                <input readonly @click="calendarState = !calendarState" :value="transactionDate" class="form-control"/>
                <div v-if="calendarState" class="mt-2 position-absolute calendar-container w-100">
                  <VDatePicker
                      @mouseleave="calendarState = false"
                      :masks="calendarMask"
                      mode="date"
                      :min-date="new Date()"
                      :color="'gray'" expanded
                      v-model.string='transactionDate' />
                </div>

              </div>

            </div>

            <textarea
                v-model="transactionDescription"
                class="form-control"
                placeholder="Transaction Description"
                rows="8"
            />

            <div class="modal-footer px-0">
              <button @click="deleteTransaction" v-if="modalInEditMode" type="button" class="btn btn-light">Delete</button>
              <button type="submit" class="btn btn-dark"> {{ modalInEditMode ? 'Update' : 'Create' }} </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  top: 100%;
}

.input-container {
  gap: 10px;
}

.bi-x-lg {
  cursor: pointer;
}

</style>