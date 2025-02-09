<script lang="ts" setup>
import {Line} from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {computed, onMounted, watch} from "vue";
import {userDataModule} from "@/stores/userDataModule.ts";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const userDataManagement = userDataModule()
const transactionRangeFilter = computed(() => userDataManagement.transactionsTimeRangeGetter)
const transactionsReferenceData = computed(() => userDataManagement.transactionDataGetter)
const filteredData = computed(() => transactionsReferenceData.value.filter((transactionInArray) =>
    transactionInArray.transactionType === 'income'
    && transactionInArray.notFormatedTransactionDate < transactionRangeFilter.value.endDate
    && transactionInArray.notFormatedTransactionDate > transactionRangeFilter.value.startDate
))
const graphicData = computed(() => filteredData.value.map((transactionFiltered) => transactionFiltered.transactionValue))
const graphicLabels = computed(() => filteredData.value.map((transactionFiltered) => transactionFiltered.transactionDate))

const data = computed(() => ({
  labels: graphicLabels.value,
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#28A745',
      data: graphicData.value
    }
  ]
}));
const options = {
  responsive: true,
  maintainAspectRatio: false
}

</script>

<template>
  <div class="h-100 pb-4">
    <Line :data="data" :options="options"/>
  </div>
</template>

<style scoped>

</style>