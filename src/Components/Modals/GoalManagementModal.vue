<script setup lang="ts">

import {modalModule} from "@/Store/ModalModule.ts";
import {transactionsModule} from "@/Store/TransactionsModule.ts";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {useForm} from "vee-validate";
import * as yup from 'yup';
import { unformat, format } from "v-money3";
import {notificationModule} from "@/Store/NotificationModule.ts";

const moneyConfig = {
  decimal: ',',
  thousands: '.',
  prefix: 'U$ ',
  precision: 2,
  masked: true
}

const validationSchema = yup.object({
  name: yup.string().required("Name Field Is Required"),
  value: yup.string().required("Value Field Is Required").notOneOf(['0.00'], "Value Field Is Required"),
  description: yup.string().optional()
})

const { defineField, setValues, validate } = useForm({
  validationSchema
})

const notificationManagement = notificationModule()
const modalManagement = modalModule()
const transactionsManagement = transactionsModule()
const [ name ] = defineField('name')
const [ value ] = defineField('value')
const [ description ] = defineField('description')
const goalToEdit = computed(() => modalManagement.modalDataGetter)
const valueMockup = ref(null)
const modalInEditMode = ref(goalToEdit.value ? false : true)

const handleUpdateGoalState = () => {
  modalInEditMode.value = !modalInEditMode.value
}

const closeModal = () => {
  modalManagement.setModalState({ state: false })
}

const deleteGoal = () => {
  transactionsManagement.deleteGoal(goalToEdit.value)
  closeModal()
}

const validateData = async () => {
  const isValid = await validate()
  if (isValid.valid && value.value !== '0.00') return true
  if (value.value === '0.00') return notificationManagement.displayErrorMessage("Value Field Is Required")
  const errors = Object.values(isValid.errors)
  notificationManagement.displayErrorMessage(errors[0])
  return false
}

const createGoal = async () => {
  if (!await validateData()) return

  const goalPayload = {
    name: name.value,
    value: value.value.replace('.', ','),
    ...description.value && { description: description.value }
  }
  transactionsManagement.createGoal(goalPayload)
  closeModal()
}

const updateGoal = async () => {
  if (!await validateData()) return
  const { name: goalName, value: goalValue, description: goalDescription , ...rest } = goalToEdit.value

  const goalToPush = {
    ...rest,
    name: name.value,
    value: value.value.replace('.', ','),
    description: description.value
  }
  
  transactionsManagement.updateGoal(goalToPush)
  closeModal()
}

const setGoalDataToUpdate = async () => {
  if (!goalToEdit.value) return

  setValues({
    name: goalToEdit.value.name,
    value: goalToEdit.value.value,
    description: goalToEdit?.value?.description || ''
  })

  await nextTick(() => {
    valueMockup.value = format(goalToEdit.value.value, moneyConfig)
  })
}

watch(valueMockup, () => {
  setValues({
    value: unformat(valueMockup.value, moneyConfig)
  })
})

onMounted(() => {
  setGoalDataToUpdate()
})

watch(modalInEditMode, () => {
  setGoalDataToUpdate()
})
</script>

<template>
  <div class="modal modalBackground d-block">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content border-0 p-4">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="m-0 fw-bold">Goal Information</h4>
          <i @click="closeModal" class="bi bi-x-lg"></i>
        </div>
        <div class="my-4">
          <div class="d-flex flex-column gap-3" v-if="modalInEditMode">
            <div class="d-flex gap-2">
              <input v-model="name" class="form-control w-75" placeholder="Goal Name"/>
              <input v-money3="moneyConfig" v-model.lazy="valueMockup" class="w-25 form-control" placeholder="Value"/>
            </div>

            <textarea
                v-if="modalInEditMode"
                v-model="description"
                class="form-control mt-4"
                placeholder="Description"
                rows="6"
            />
          </div>
          <div
              v-else
              class="d-flex flex-column gap-3"
          >
            <div class="d-flex w-100 gap-2">
              <div class="w-50">
                <label class="fw-bold">Name: </label>
                <p>{{ name }}</p>
              </div>
              <div class="w-50">
                <label class="fw-bold">Value: </label>
                <p>U$ {{ value }}</p>
              </div>
            </div>

            <div class="d-flex w-100 gap-2">
              <div class="w-50">
                <label class="fw-bold">Amount Saved: </label>
                <p>U$ {{ goalToEdit.amountSaved }}</p>
              </div>
              <div class="w-50">
                <label class="fw-bold">Amount Pendent: </label>
                <p>U$ {{ goalToEdit.amountPendent}}</p>
              </div>
            </div>

            <div
                v-if="description"
                class="w-75">
              <label class="fw-bold">Description: </label>
              <p>{{ description }}</p>
            </div>
          </div>
        </div>

        <div class="d-flex">
          <button v-if="!goalToEdit" @click="createGoal" class="w-100 btn btn-dark text-white">Create Goal</button>
          <button v-if="!modalInEditMode" @click="handleUpdateGoalState" class="w-100 btn btn-dark text-white">Update Goal</button>
        </div>

        <div
            v-if="modalInEditMode && goalToEdit"
            class="d-flex buttons-container"
        >
          <button @click="updateGoal" class="w-50 btn btn-dark text-white">Save Goal</button>
          <button @click="deleteGoal" class="btn btn-dark w-50 text-white">Delete Goal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.buttons-container {
  gap: 15px;
}

.input-wrapper {
  gap: 15px;
}

.bi-x-lg {
  cursor: pointer;
}
</style>