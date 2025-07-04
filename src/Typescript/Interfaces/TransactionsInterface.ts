import { number } from "yup";

export interface TransactionInterface {
    name: string;
    value: string;
    type: string;
    state: string;
    installment?: number;
    date: string;
    description?: string;
    notFormatedDate: Date | string;
    id: number,
    categories?: CategoriesInterface
}

export interface CategoryDataInterface { name: string; color: string }

export interface CategoriesInterface {
    [key: string]: CategoryDataInterface;
}

export interface SavingTransactionInterface {
    associatedGoal: number;
    date: string | Date;
    id?: number;
    name: string;
    notFormatedDate: Date | string;
    value: string;
    type?: string;
    state?: string
}

export interface GoalInterface {
    id: number;
    name: string;
    index: number;
    value: string;
    amountSaved: number;
    amountPendent: number;
    percentageAchieved: number;
    transactionsAssociated: SavingTransactionInterface[]
}

export interface transactionsDataInObject {
    [key: string] : TransactionInterface[] | SavingTransactionInterface[]
}

export interface transactionsParsedInWeeks {
    [key: number | string]: (TransactionInterface | SavingTransactionInterface)[];
  }

  export interface timeRangeInterface {
    startDate: string | Date ,
    endDate: string | Date,
    name: string | Date
  }

  export interface TransactionsModuleState {
    expenses: TransactionInterface[],
    incomes: TransactionInterface[],
    savings: SavingTransactionInterface[],
    goals: GoalInterface[],
    timeRange: timeRangeInterface,
    shouldCalculateDashboardData: boolean
  }