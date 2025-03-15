<script setup lang="ts">

defineProps({
  goal: { type: Object, required: true }
})

</script>

<template>
  <div class="goal-card w-100 rounded-2 mb-4 px-3">
    <div class="d-flex justify-content-between">
      <p class="mb-2">{{ goal.name }}</p>
      <p>75%</p>
    </div>
    <div class="d-flex w-100">
      <div class="bg-info w-75 progress-bar"></div>
      <div class="bg-secondary opacity-25 w-25 missing-bar"></div>
    </div>
  </div>
</template>

<style scoped>
.goal-card {
  cursor: pointer;
}

.progress-bar, .missing-bar {
  height: 3px;
}
</style>