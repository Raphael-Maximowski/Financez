<script setup lang="ts">

defineProps({
  transaction: { type: Object, required: true }
})

</script>

<template>
  <div class="align-items-center transaction-card justify-content-between  w-100 bg-white py-3 d-flex">
    <div>
      <p class="mb-0">{{ transaction.name }}</p>
      <p class="mb-0 small-letters text-secondary">{{ transaction.date }}</p>
    </div>
    <p :class="[ transaction.type === 'Expense' ? 'text-danger' : 'text-success', 'mb-0']">U$ {{ transaction.value }}</p>
  </div>
</template>

<style scoped>
.transaction-card {
  cursor: pointer;
  border-bottom: 1px solid lightgray;
}

.small-letters {
  font-size: 12px;
}
</style>