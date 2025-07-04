import { extend } from "v-calendar/dist/types/src/utils/helpers.js";
import type { SavingTransactionInterface, TransactionInterface } from "./TransactionsInterface";

export interface  DoughnutChartInterface {
    labels?: string[]
    datasets?: chartDataSetInterface[]
}

export interface LineChartInterface {
    datasets: lineChartDataSetInterface[];
    labels: string[]
}

export interface lineChartDataSetInterface {
    backgroundColor: string;
    data: number[];
    label: string;
}

export interface chartDataSetInterface {
    backgroundColor: string[];
    data: number[]
}

export interface chartOptions {
    responsive: boolean;
    maintainAspectRatio: boolean
}

export interface BarChartInterface extends DoughnutChartInterface {}

export interface calculateDataBasedInWeeksInterface {
    chartLabel: string[]
    values: number[] | { [key: string]: number[] }
}

export interface ChartStateInterface {
    tableTransactionsData: Array<TransactionInterface | (SavingTransactionInterface & { type?: string })>;
    tableTitle: string;
    chartConfig: {
        lineDataSets: lineChartDataSetInterface[],
        lineLabels: string[],
        doughnutDataSet: DoughnutChartInterface
    }
}