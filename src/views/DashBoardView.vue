<script setup lang="ts">
import DashBoardCard from "@/components/Cards/DashBoardCard.vue";
import {computed} from "vue";
import { userDataModule} from "@/stores/userDataModule.ts";
import type {dashboardDataInterface} from "@/typescript/DashBoard/interfaces.ts";
import DashboardChart from "@/components/Charts/DashboardChart.vue";
import TransactionsTable from "@/components/Tables/TransactionsTable.vue";

const userDataManegement: any = userDataModule()
const dashBoardData = computed<dashboardDataInterface[]>(() => userDataManegement.dashBoardDataGetter)

</script>

<template>
  <div class="w-100 h-100 d-flex flex-column">
    <div class="dashboard-card-wrapper d-flex flex-wrap align-items-center h-auto">
      <DashBoardCard
          v-for="dashboardContent in dashBoardData"
          :key="dashboardContent.id"
          :dashboardContent="dashboardContent"
      />
    </div>
    <div class="flex-grow-1 aaa py-4 d-xl-flex">
      <div class="col-xl-6 col-12 h-100">
        <TransactionsTable />
      </div>
      <div class="col-xl-6 mt-4 mt-xl-0 col-12 d-flex align-items-center justify-content-center h-100">
        <DashboardChart />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-card-wrapper {
  gap: 15px;
}

.aaa {
  gap: 10px;
}
</style>