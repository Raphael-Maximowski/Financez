<script setup lang="ts">

import TransactionsTable from "@/components/Tables/TransactionsTable.vue";
import TotalBalanceLIneChart from "@/components/Charts/TotalBalanceLineChart.vue";
import TotalBalanceDoughtnutChart from "@/components/Charts/TotalBalanceDoughtnutChart.vue";
</script>

<template>
  <div class="w-100 d-xxl-flex">
    <div class="col-xxl-9 wrapper h-100 col-12">
      <div class="w-100 main-container">
        <TotalBalanceLIneChart />
      </div>
      <div class="w-100 main-container">
        <TransactionsTable />
      </div>
    </div>
    <div class="col-xxl-3 col-12 secondary-container ">
      <TotalBalanceDoughtnutChart />
    </div>
  </div>
</template>

<style scoped>
</style>