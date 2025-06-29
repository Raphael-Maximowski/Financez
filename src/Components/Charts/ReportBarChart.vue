<script setup lang="ts">
import {ref} from "vue";
import {Bar} from "vue-chartjs";

defineProps({
  dataSet: { type: Object, required: true }
})

const options = {
  responsive: true,
  maintainAspectRatio: false
}

</script>

<template>
  <div v-if="dataSet" class="px-5 bart-chart-container w-100 flex-grow-1">
    <Bar :options="options" :data="dataSet"/>
  </div>
</template>

<style scoped>

</style>