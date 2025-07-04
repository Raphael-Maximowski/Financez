import type { ChartStateInterface, DoughnutChartInterface, lineChartDataSetInterface } from "@/Typescript/Interfaces/ChartInterfaces";
import type { SavingTransactionInterface, TransactionInterface } from "@/Typescript/Interfaces/TransactionsInterface";
import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const chartsModule = defineStore('chartsModule', () => {

    const chartData = ref<ChartStateInterface>({
        tableTransactionsData: [],
        tableTitle: '',
        chartConfig: {
            lineDataSets: [],
            lineLabels: [],
            doughnutDataSet: {}
        },
    })

    const tableTitleGetter = computed<string>(() => chartData.value.tableTitle)
    const doughnutDataSetGetter = computed<DoughnutChartInterface>(() => chartData.value.chartConfig.doughnutDataSet)
    const tableTransactionsGetter = computed<Array<TransactionInterface | (SavingTransactionInterface & { type?: string })> | SavingTransactionInterface[]>(() => chartData.value.tableTransactionsData)
    const lineDataSetsGetter = computed<lineChartDataSetInterface[]>(() => chartData.value.chartConfig.lineDataSets)
    const lineLabelsGetter = computed<string[]>(() => chartData.value.chartConfig.lineLabels)

    const setTableTitle = (tableTitle: string): void => {
        if (!tableTitle) return
        chartData.value.tableTitle = tableTitle
    }

    const setDoughnutData = (dataSet: DoughnutChartInterface): void => {
        if (!dataSet) return
        chartData.value.chartConfig.doughnutDataSet = dataSet
    }

    const setLineChartConfig = (dataSets: lineChartDataSetInterface[], labels: string[]) => {
        if (!dataSets || !labels) return
        chartData.value.chartConfig.lineDataSets = dataSets
        chartData.value.chartConfig.lineLabels = labels
    }

    const setTransactionsTableData = (transactionsData: TransactionInterface[] | SavingTransactionInterface[]): void => {
        if (!transactionsData) return
        chartData.value.tableTransactionsData = [...transactionsData]
    }

    return {
        chartData,
        doughnutDataSetGetter,
        lineDataSetsGetter,
        lineLabelsGetter,
        tableTransactionsGetter,
        tableTitleGetter,
        setTransactionsTableData,
        setDoughnutData,
        setLineChartConfig,
        setTableTitle,
    }
}, { persist: true })