<script setup lang="ts">
import {modalModule} from "@/Store/ModalModule.ts";
import {computed, onMounted, ref, watch} from "vue";
import {useForm} from "vee-validate";
import * as yup from 'yup';
import {transactionsModule} from "@/Store/TransactionsModule.ts";
import {notificationModule} from "@/Store/NotificationModule.ts";
import {unformat, format} from "v-money3";
import {categoriesModule} from "@/Store/CategoriesModule.ts";
import type { CategoriesInterface } from "@/Typescript/Interfaces/TransactionsInterface";
import type { calendarMaskInterface, moneyMaskSettingsInterface } from "@/Typescript/Interfaces/AssociatedToLibInterfaces";
const modalManagement = modalModule()
const transactionsManagement = transactionsModule()
const notificationManagement = notificationModule()
const categoriesManagement = categoriesModule()
const categoriesData = computed<CategoriesInterface>(() => categoriesManagement.categoriesDataGetter)
const categoriesKeys = computed<string[]>(() =>  typeof categoriesData.value === 'object' ? Object.keys(categoriesData.value) : [])
const modalData = computed<any>(() => modalManagement.modalDataGetter)
const modalInEditMode = computed<boolean>(() => !!modalData.value)
const categoriesKeysPaginated = computed<string[]>(() => categoriesKeys.value.slice(page.value * 5, (page.value + 1) * 5))
const categoriesNameAssociatedToTransaction = computed<string>(() => {
  let categoriesName = categoriesAssociatedToTransaction.value.map((categoryKey) => categoriesData.value[categoryKey].name)
  return categoriesName.join(', ')
})
const categoriesAssociatedToTransaction = ref<string[]>([])
const categorySelectState = ref<boolean>(false)
const categoryInCreationMode = ref<boolean>(false)
const newCategoryColor = ref<string>('#000000')
const calendarState = ref<boolean>(false)
const installmentState = ref<boolean>(false)
const newCategoryName = ref<string>()
const valueMockUp = ref<string>()
const page = ref<number>(0)
const inputColor = ref<HTMLElement>()
const userIsSettingCategoryColor = ref<boolean>(false)
const stateOptions: string[] = ['Pendent', 'Paid']
const moneyConfig: moneyMaskSettingsInterface = {
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

const calendarMask: calendarMaskInterface = {
  modelValue: 'DD/MM/YYYY'
}

const {defineField, validate, setValues} = useForm({
  validationSchema
})

const [name] = defineField('name')
const [value] = defineField('value')
const [type] = defineField('type')
const [state] = defineField('state')
const [installment] = defineField('installment')
const [date] = defineField('date')
const [description] = defineField('description')

const setCalendarState = (state: boolean): void => {
  calendarState.value = state
}

const closeModal = () => {
  modalManagement.setModalState({state: false})
}

const cancelInstallmentState = (): void => {
  installmentState.value = false
  setValues({
    installment: null
  })
}

const validateFormData = async (): Promise<boolean> => {
  const isValid = await validate()
  if (isValid.valid && value.value > 0) return true
  const errorsData = Object.values(isValid.errors)
    if (value.value <= 0 ) {
      errorsData.push("Insert a Valid Value")
  }
  notificationManagement.displayErrorMessage(errorsData[0] ?? 'Error')
  return false
}

const createTransaction = async (): Promise<void> => {
  if (!await validateFormData()) return

  const [day, month, year] = date.value.split("/").map(Number);

  const payload = {
    name: name.value,
    value: value.value.replace('.', ','),
    type: type.value,
    state: state.value,
    notFormatedDate: new Date(year, month - 1, day),
    date: date.value,
    categories: categoriesAssociatedToTransaction.value,
    ...(installment.value && {installment: installment.value}),
    ...(description.value && {description: description.value}),
  }

  transactionsManagement.setTransactionData(payload)
  closeModal()
}

const deleteTransaction = (): void => {
  if (!modalData.value) return
  transactionsManagement.deleteTransaction(modalData.value)

  closeModal()
}

const editTransaction = async (): Promise<void> => {
  if (!await validateFormData() || !modalData.value) return

  const [day, month, year] = date.value.split("/").map(Number);

  const payload = {
    id: modalData.value.id,
    name: name.value,
    value: value.value.replace('.', ','),
    type: type.value,
    state: state.value,
    notFormatedDate: new Date(year, month - 1, day),
    date: date.value,
    categories: categoriesAssociatedToTransaction.value,
    ...(installment.value && {installment: installment.value}),
    ...(description.value && {description: description.value}),
  }

  transactionsManagement.updateTransaction(payload)
  closeModal()
}

const createCategory = (): void => {
  if (!newCategoryName.value) {
    notificationManagement.displayErrorMessage("Insert A Valid Category Name!")
    return
  }

  const categoryObject = {name: newCategoryName.value, color: newCategoryColor.value}

  categoriesManagement.createCategory(categoryObject)
  handleCategoryInCreationMode()
}

const clearCreateCategoryData = (): void => {
  newCategoryColor.value = '#000000'
  newCategoryName.value = undefined
}

const setVariablesToEdit = (): void => {
  if (!modalInEditMode.value) return
  valueMockUp.value = format(modalData.value.value, moneyConfig)
  setValues({
    name: modalData.value.name,
    value: modalData.value.value,
    type: modalData.value.type,
    state: modalData.value.state,
    date: modalData.value.date,
    ...(modalData.value.description && {description: modalData.value.description}),
    ...(modalData.value.installment && {installment: modalData.value.installment})
  })

  modalData.value.installment && (installmentState.value = true)
  categoriesAssociatedToTransaction.value = modalData?.value?.categories || []
}

const resetUserIsSettingCategoryColor = (): void => {
  userIsSettingCategoryColor.value = false
}

const openInputColor = (): void => {
  if (inputColor.value) {
    inputColor.value.click()
    userIsSettingCategoryColor.value = true
  }
  inputColor.value && (inputColor.value.click())
}

const handlePagination = (action: string): void => {
  if (action === 'increment') {
    if (categoriesKeysPaginated.value.length >= 5) {
      page.value++
    }
    return
  }

  if (page.value > 0) {
    page.value--
  }
}

const handleCategorySelectState = (): void => {
  if (userIsSettingCategoryColor.value) return
  categorySelectState.value = !categorySelectState.value
}

const handleCategoriesAssociatedToTransaction = (event: Event,categoryId: string): void => {
  const target = event.target as HTMLInputElement
  const checkboxState = target.checked
  if (checkboxState) {
    categoriesAssociatedToTransaction.value.push(categoryId)
    return
  }

  const categoryIndex = categoriesAssociatedToTransaction.value.findIndex((categoryArrayId) => categoryArrayId === categoryId)
  categoryIndex !== -1 && (categoriesAssociatedToTransaction.value.splice(categoryIndex, 1))
}

const handleCategoryInCreationMode = (): void => {
  categoryInCreationMode.value = !categoryInCreationMode.value

  if (!categoryInCreationMode.value) {
    clearCreateCategoryData()
  }
}

watch(valueMockUp, (newValue: string | undefined): void => {
  if (newValue) {
    setValues({
    value: unformat(newValue, moneyConfig)
  })
  }
})

onMounted((): void => {
  setVariablesToEdit()
})
</script>

<template>
  <div class="modal modalBackground d-block">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content border-0 px-4 py-5">
        <div class="modal-header-container pb-4 d-flex align-items-center justify-content-between">
          <h3 class="m-0 fs-4">{{ modalInEditMode ? 'Edit' : 'Create' }} Transaction</h3>
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
              <select :disabled="modalInEditMode" v-model="type" class="w-100 form-select">
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
                > {{ option }}
                </option>
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
              <input @click="setCalendarState(true)" readonly class="form-control" :value="date"/>

              <div v-if="calendarState" @mouseleave="setCalendarState(false)"
                   class="mt-2 w-100 position-absolute v-calendar-container">
                <VDatePicker
                    expanded
                    v-model.string="date"
                    :masks="calendarMask"
                    :min-date="new Date()"
                    :color="'gray'"
                    mode="date"/>
              </div>
            </div>
          </div>

          <div class="d-flex input-section w-100 gap-between-inputs">
            <div class="position-relative w-50">
              <label>Category: </label>
              <input :value="categoriesNameAssociatedToTransaction" @click="handleCategorySelectState" readonly class="form-select"/>
              <div
                  v-if="categorySelectState"
                  class="px-3 d-flex flex-column gap-2 mt-2 w-100 py-2 rounded-2 position-absolute bg-white z-2 shadow"
                  @mouseleave="handleCategorySelectState"
                  @mouseenter="resetUserIsSettingCategoryColor"
              >
                <div class="d-flex gap-2">
                  <i
                      @click="handlePagination('decrement')"
                      :class="[ page > 0 ? 'opacity-100' : 'opacity-50', 'bi bi-arrow-left-square']"></i>
                  <i
                      @click="handlePagination('increment')"
                      :class="[ categoriesKeysPaginated.length >= 5 ? 'opacity-100' : 'opacity-50', 'bi bi-arrow-right-square']"></i>
                </div>

                <div
                    v-if="categoriesKeysPaginated.length > 0"
                >
                  <label
                      v-for="categoryKey in categoriesKeysPaginated"
                      :key="categoryKey"
                      class="category-content mb-0 d-block my-2">
                    <input :checked="categoriesAssociatedToTransaction.includes(categoryKey)" @change="event => handleCategoriesAssociatedToTransaction(event, categoryKey)" type="checkbox"/>
                    <span :style="{ color: categoriesData[categoryKey].color, backgroundColor: categoriesData[categoryKey].color + '26' }" class="category-span ms-2 px-2 py-1 rounded-1">{{ categoriesData[categoryKey].name }}</span>
                  </label>
                </div>

                <p class="mb-0 category-content" v-else>
                  No Categories Found
                </p>

                <div>
                  <p
                      @click="handleCategoryInCreationMode"
                      v-if="!categoryInCreationMode"
                      class="small-content">+ Create category</p>
                  <div
                      v-else
                      class="d-flex align-items-center gap-3 position-relative"
                  >
                    <input
                        type="color"
                        v-model="newCategoryColor"
                        ref="inputColor"
                        class="opacity-0 input-color position-absolute"/>
                    <div
                        :style="{ backgroundColor: newCategoryColor }"
                        @click="openInputColor"
                        class="cursor-pointer color-span rounded-3"></div>
                    <input
                        @keyup.enter="createCategory"
                        v-model="newCategoryName"
                        placeholder="Insert Category Name"
                        class="flex-grow-1 px-2 py-1 small-content custom-input rounded-2"/>
                    <i class="bi bi-x-lg"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-50"/>
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
.category-span {
  font-size: 12px;
}

.input-color {
  width: 5px;
  height: 5px;
}

.custom-input {
  border: 1px solid lightgray;
}

.custom-input:focus {
  border: 1px solid lightgray;
  box-shadow: none;
  outline: none;
}

.color-span {
  background-color: red;
  width: 10px;
  height: 10px;
}

.category-content {
  font-size: 14px;
}

.small-content {
  color: gray;
  font-size: 12px;
}

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