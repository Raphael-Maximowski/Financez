<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref, watch} from "vue";
import {userDataModule} from "@/stores/userDataModule.ts";
import {setTimeRangeBasedInActualDate} from "@/utils/formatToDate.ts";

const route = useRoute()
const router = useRouter()
const selectRoute = ref()
const timeRangeSelected = ref('week')
const userDataManagement = userDataModule()
const routeOptions = [
  { routeName: 'Total Balance Management View', selectTitle: 'Total Balance' },
  { routeName: 'Incomes Management View', selectTitle: 'Incomes' },
  { routeName: 'Expenses Management View', selectTitle: 'Expenses' },
]

const checkRoute = (routeName) => {
  switch (routeName) {
    case 'Total Balance Management View':
      selectRoute.value = routeOptions[0]
      break;
    case 'Incomes Management View':
      selectRoute.value = routeOptions[1]
      break;
    case 'Expenses Management View':
      selectRoute.value = routeOptions[2]
      break;
  }
}

const setTimeRange = (timeInDate, timeRange) => {
  const dateInterval = setTimeRangeBasedInActualDate(timeInDate, timeRange)
  userDataManagement.setTransactionsTimeRange(dateInterval)
}

onMounted(() => {
  checkRoute(route.name)
  setTimeRange(new Date(), 'week')
})

watch(route, (newRoute) => {
  checkRoute(newRoute.name)
})

watch(selectRoute, (newValue) => {
  router.push({ name: newValue.routeName })
})

watch(timeRangeSelected, (newRange) => {
  setTimeRange(new Date(), newRange)
})
</script>

<template>
  <div class="position-relative d-flex">
    <select v-model="selectRoute" class="form-select ">
      <option
          v-for="(route, index) in routeOptions"
          :key="index"
          :value="route"
      >
        {{ route.selectTitle }}
      </option>
    </select>

    <select v-model="timeRangeSelected" class="form-select ms-3">
      <option value="week">Week</option>
      <option value="month">Month</option>
      <option value="year">Year</option>
    </select>
  </div>
</template>

<style scoped>
.form-select {
  width: 200px;
}
</style>