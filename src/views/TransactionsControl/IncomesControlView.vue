<script setup lang="ts">

import TransactionsTable from "@/components/Tables/TransactionsTable.vue";
import IncomesLineChart from "@/components/Charts/IncomesLineChart.vue";
import IncomesDoughnutChart from "@/components/Charts/IncomesDoughnutChart.vue";
</script>

<template>
  <div class="w-100 h-100 d-xxl-flex">
    <div class="col-xxl-9 col-12 h-100">
      <div class="main-container w-100">
        <IncomesLineChart />
      </div>
      <div class="main-container w-100">
        <TransactionsTable />
      </div>
    </div>
    <div class="col-xxl-3 secondary-container col-12">
      <IncomesDoughnutChart />
    </div>
  </div>
</template>

<style scoped>
</style>