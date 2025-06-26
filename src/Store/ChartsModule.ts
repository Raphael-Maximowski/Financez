import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const chartsModule = defineStore('chartsModule', () => {

    const chartData = ref({
        tableTransactionsData: [],
        tableTitle: '',
        chartConfig: {
            lineDataSets: [],
            lineLabels: [],
            doughnutDataSet: []
        },
    })

    const tableTitleGetter = computed(() => chartData.value.tableTitle)
    const doughnutDataSetGetter = computed(() => chartData.value.chartConfig.doughnutDataSet)
    const tableTransactionsGetter = computed(() => chartData.value.tableTransactionsData)
    const lineDataSetsGetter = computed(() => chartData.value.chartConfig.lineDataSets)
    const lineLabelsGetter = computed(() => chartData.value.chartConfig.lineLabels)

    const setTableTitle = (tableTitle) => {
        if (!tableTitle) return
        chartData.value.tableTitle = tableTitle
    }

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
        chartData.value.tableTransactionsData = [...transactionsData]
    }

    return {
        doughnutDataSetGetter,
        lineDataSetsGetter,
        lineLabelsGetter,
        tableTransactionsGetter,
        setTransactionsTableData,
        setDoughnutData,
        setLineChartConfig,
        setTableTitle,
        tableTitleGetter
    }
})