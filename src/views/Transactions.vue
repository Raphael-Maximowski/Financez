<script lang="ts" setup>
import TransactionsDropDown from "@/components/DropDowns/TransactionsDropDown.vue";
import type {dropDownOptionInterface} from "@/TypeScript/Interfaces/interfaces.ts";
import {ref} from "vue";

const dropDownOption: dropDownOptionInterface = ref({ optionName: 'Total Balance', optionValue: 'Balance', id: 1 },)

const handleDropDownOption = (optionValue: dropDownOptionInterface):void => {
  dropDownOption.value = optionValue
}

</script>

<template>
  <div class="w-100 h-100 d-flex flex-column">
    <div class="d-flex align-items-center">
      <h2 class="mb-0 fs-5"> Transactions </h2>
      <TransactionsDropDown
          :dropDownOption="dropDownOption"
          @handleDropDownOption="handleDropDownOption"
      />
    </div>
    <div class="py-4 flex-grow-1 ">
      <div v-if="dropDownOption.optionValue === 'Balance'" class="w-100 h-100">
        <div class="h-50 w-100 bg-success d-flex">
          <div class="w-50 h-100 bg-info">

          </div>
          <div class="w-50 h-100 bg-dark">

          </div>
        </div>
        <div class="w-100 h-50 bg-danger"></div>
      </div>
      <RouterView  v-else/>
    </div>

  </div>
</template>

<style scoped>
</style>