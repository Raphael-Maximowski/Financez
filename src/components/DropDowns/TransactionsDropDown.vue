<script setup lang="ts">
import {ref} from "vue";
import type {dropDownOptionInterface} from "@/TypeScript/Interfaces/interfaces.ts";

defineProps({
  dropDownOption: { type: Object, required: true }
})
const emits = defineEmits(['handleDropDownOption'])
const dropDownState: boolean = ref(false)
const dropDownOptions: dropDownOptionInterface[] = ref([
  { optionName: 'Total Balance', optionValue: 'Balance', id: 1 },
  { optionName: 'Investments', optionValue: 'Investment', id: 2 },
  { optionName: 'Expenses', optionValue: 'Expense', id: 3 }
])

const handleDropDownState = ():void => {
  dropDownState.value = !dropDownState.value
}

const handleDropDownOption = (optionValue: dropDownOptionInterface):void => {
  emits('handleDropDownOption', optionValue)
  handleDropDownState()
}

</script>

<template>
  <div class="dropdown-wapper ms-4 position-relative">
    <button @click="handleDropDownState" class="m-0 fs-6 btn btn-dark w-100 py-0">
      {{ dropDownOption.optionName }} <i class="bi bi-chevron-down ms-2"></i>
    </button>

    <div v-if="dropDownState" class="dropdown-container rounded-2 mt-2 w-100 position-absolute">
      <ul class="m-0 px-3 py-2">
        <li
            :class="[  dropDownInArray.id === dropDownOption.id ? 'text-white' : 'text-secondary' ,'list']"
            v-for="dropDownInArray in dropDownOptions"
            @click="handleDropDownOption(dropDownInArray)"
            :key="dropDownInArray.id"
        >
          {{ dropDownInArray.optionName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.dropdown-container {
  background-color: #212529;
}

.dropdown-wapper {
  width: 200px;
}

.list {
  list-style-type: none;
  cursor: pointer;
}
</style>