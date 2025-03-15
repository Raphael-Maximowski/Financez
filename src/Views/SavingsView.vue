<script setup lang="ts">
import GoalCard from "@/Components/Card/GoalCard.vue";
import TransactionsTables from "@/Components/Tables/TransactionsTables.vue";

const test = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]

</script>

<template>
  <div class="d-xxl-flex w-100 savings-container">
    <div class="col-xxl-9 h-100 col-12">
      <div class="w-100 h-50">

      </div>
      <div class="w-100 h-50">
        <TransactionsTables />
      </div>
    </div>
    <div class="ps-3 goals-list overflow-y-auto col-xxl-3 h-100 col-12">
      <GoalCard />
    </div>
  </div>
</template>

<style scoped>
.savings-container {
  height: 80vh;
}

.goals-list::-webkit-scrollbar {
  width: 11px;
}

.goals-list::-webkit-scrollbar-track {
  background: var(--blue-4);
  border-radius: 20px;
}

.goals-list::-webkit-scrollbar-thumb {
  width: 11px;
  background-color: #1B557A24;
  border-radius: 20px;
}
</style>