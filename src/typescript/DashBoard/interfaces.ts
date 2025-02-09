interface graphicDataSets {
    data: number[];
    backgroundColor: string[];
}

export interface dashboardDataInterface {
    title: string;
    amount: number;
    percentage: number;
    id: number,
    route: string
}

export interface dashboardChartInterface {
    labels: string[];
    datasets: graphicDataSets
}

export interface modalDataInterface {
    modalState: boolean;
    modalName: string | null;
    modalExtendedData: any
}

export interface transactionDataInterface {
    transactionTitle: string,
    transactionValue: number,
    transactionType: string,
    transactionState: string,
    transactionDate: string,
    transactionDescription?: string,
    transactionInstallment?:string
    id?: number
}

export interface moneyConfigInterface {
    prefix: string,
    thousands: string,
    decimal: string,
    precision: number,
    disableNegative: boolean,
    disabled: boolean,
    min: number,
    masked: boolean,
    minimumNumberOfCharacters: number,
    shouldRound: boolean,
    focusOnRight: boolean,
}

export interface calendarMaskInterface {
    modelValue: string
}

export interface transactionsFiltersInterface {
    typeTransaction: string,
    state: string
}