<script setup lang="ts">

defineProps({
  dashboardData: { type: Object, required: true }
})

</script>

<template>
  <div class="bg-white dashboard-container px-4 py-2 rounded-1">
    <div class="w-100 d-flex justify-content-between">
      <p class="mb-1 fs-6"> {{ dashboardData.title }} </p>
      <i class="bi bi-arrow-up-right-square"></i>
    </div>
    <h4 class="fs-5 mb-1">U$ {{ dashboardData.value }}</h4>
    <p class="mb-1 small-text"> {{ dashboardData.percentage }} </p>
  </div>
</template>

<style scoped>

.dashboard-container {
  border: 1px solid lightgray;
  cursor: pointer;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.02),
  -5px -5px 10px rgba(0, 0, 0, 0.02),
  -5px 5px 10px rgba(0, 0, 0, 0.02),
  5px -5px 10px rgba(0, 0, 0, 0.02);
}

@media(min-width: 1200px) {
  .dashboard-container {
    flex: 1 1 calc(25% - 16px); /* 50% em telas médias */
  }
}

@media(min-width: 768px) and (max-width: 1199px) {
  .dashboard-container {
    flex: 1 1 calc(50% - 16px); /* 50% em telas médias */
  }
}

@media(max-width: 767px) {
  .dashboard-container {
    flex: 1 1 calc(100% - 16px); /* 50% em telas médias */
  }
}
</style>