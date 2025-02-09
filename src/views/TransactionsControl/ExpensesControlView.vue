<script setup lang="ts">
import TransactionsTable from "@/components/Tables/TransactionsTable.vue";
import ExpensesChart from "@/components/Charts/ExpensesDoughnutChart.vue";
import ExpensesLIneChart from "@/components/Charts/ExpensesLIneChart.vue";
</script>

<template>
  <div class="w-100 h-100 d-xxl-flex d-block">
    <div class="col-12 col-xxl-9 h-auto ">
      <div class="main-container w-100">
        <ExpensesLIneChart />
      </div>
      <div class="w-100 main-container">
        <TransactionsTable />
      </div>
    </div>
    <div class="col-xxl-3 col-12 secondary-container">
      <ExpensesChart />
    </div>
  </div>
</template>

<style scoped>
</style>