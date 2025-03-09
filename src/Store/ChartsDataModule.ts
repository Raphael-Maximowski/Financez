import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const chartsDataModule = defineStore('chartsDataModule', () => {

    const chartData = ref({
        tableTransactionsData: [],
        chartConfig: {
            lineDataSets: [],
            lineLabels: [],
            doughnutDataSet: []
        },
    })

    const doughnutDataSetGetter = computed(() => chartData.value.chartConfig.doughnutDataSet)
    const tableTransactionsGetter = computed(() => chartData.value.tableTransactionsData)
    const lineDataSetsGetter = computed(() => chartData.value.chartConfig.lineDataSets)
    const lineLabelsGetter = computed(() => chartData.value.chartConfig.lineLabels)

    const setDoughnutData = (dataSet) => {
        if (!dataSet) return
        chartData.value.chartConfig.doughnutDataSet = dataSet
    }

    const setLineChartConfig = (dataSets, labels) => {
        if (!dataSets || !labels) return
        chartData.value.chartConfig.lineDataSets = dataSets
        chartData.value.chartConfig.lineLabels = labels
    }

    const setTransactionsTableData = (transactionsData) => {
        if (!transactionsData) return
        chartData.value.tableTransactionsData = transactionsData
    }

    return {
        doughnutDataSetGetter,
        lineDataSetsGetter,
        lineLabelsGetter,
        tableTransactionsGetter,
        setTransactionsTableData,
        setDoughnutData,
        setLineChartConfig,
    }
})