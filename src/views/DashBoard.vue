<script setup lang="ts">
import DashBoardCard from "@/components/Cards/DashBoardCard.vue";
import {useRouter} from "vue-router";
import Transactions from "@/components/Tables/Transactions.vue";
import MonthBalanceChart from "@/components/Charts/MonthBalanceChart.vue";
import {computed} from "vue";
import {userConfigStore} from "@/stores/userConfig.ts";
import type {routeOptions} from "@/TypeScript/Interfaces/interfaces.ts";

const router = useRouter()
const userConfigManagement = userConfigStore()
const userWidth: number = computed(() => userConfigManagement.userWidthGetter)
const dashBoardsData: routeOptions[] = [
  { title: 'Total Balance', value: '18.250,00', percentage: '+2.5%', routeName: 'DashBoard View' },
  { title: 'Income', value: '18.250,00', percentage: '+2.5%', routeName: 'Incomes View' },
  { title: 'Expenses', value: '18.250,00', percentage: '+2.5%', routeName: 'Expenses View' },
  { title: 'Savings', value: '18.250,00', percentage: '+2.5%', routeName: 'Savings View' },
]

const routeToView = (routeName: string):void => {
  router.push({ name: routeName })
}

</script>

<template>
  <div class="w-100 dashboard-wrapper overflow-y-auto d-flex flex-column">
    <div class="mx-0 d-flex flex-wrap cards-container">
      <DashBoardCard
          v-for="dashboardData in dashBoardsData"
          :key="dashboardData.title"
          :dashboardData="dashboardData"
          @click="routeToView(dashboardData.routeName)"
      />
    </div>

    <div :class="[ userWidth <= 992 ? '' : 'flex-grow-1' ,'dashboard-content overflow-hidden d-lg-flex mt-4']">
      <div class="col-12 col-lg-6 bg-white light-border transactions-container px-4 rounded-1 ">
        <Transactions />
      </div>
      <div class="mt-lg-0 mt-5 col-12 col-lg-6 d-flex justify-content-center align-items-center">
        <MonthBalanceChart class="w-75" />
      </div>
    </div>
  </div>

</template>

<style scoped>
.dashboard-wrapper {
  min-height: 100%;
}

.transactions-container {
  min-height: 500px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.02),
  -5px -5px 10px rgba(0, 0, 0, 0.02),
  -5px 5px 10px rgba(0, 0, 0, 0.02),
  5px -5px 10px rgba(0, 0, 0, 0.02);
}

.cards-container {
  gap: 15px;
}

.dashboard-content {
  gap: 15px;
  min-height: 55vh;
}
</style>