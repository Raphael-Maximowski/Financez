<script setup lang="ts">
import TransactionsDropDown from "@/components/DropDowns/TransactionsDropDown.vue";
</script>

<template>
  <div class="w-100 h-100 d-flex flex-column">
    <TransactionsDropDown />
    <div class="flex-grow-1">
      <RouterView />
    </div>
  </div>

</template>

<style scoped>

</style>