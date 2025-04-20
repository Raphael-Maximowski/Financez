<script setup lang="ts">
import {computed, watch} from "vue";
import {transactionsDataModule} from "@/Store/TransactionsDataModule.ts";

const props = defineProps({
  goal: { type: Object, required: true }
})

</script>

<template>
  <div class="mb-3 d-flex w-100 bg-white px-3 rounded-2 py-3 goal-card">
    <div class="w-100">
      <div class="mb-2 d-flex justify-content-between">
        <p class="mb-0">{{ goal.name }}</p>
        <i class="bi bi-three-dots-vertical"></i>
      </div>
      <div ref="tooltipContainer" class="d-flex">
        <span
            :style="{ width: `${goal.percentageAchieved}%` }"
            class="bg-dark percentage-span"></span>
        <span
            :style="{ width: `${100 - goal.percentageAchieved}%` }"
            class="pendent-span percentage-span"></span>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<style scoped>
.small-text {
  font-size: 12px;
}

.percentage-span {
  height: 3px;
  transition: 0.5s;
}

.bi-three-dots-vertical {
  cursor: pointer;
}

.pendent-span {
  background-color: lightgray;
}

.goal-card {
  border: 1px solid lightgray;
}
</style>