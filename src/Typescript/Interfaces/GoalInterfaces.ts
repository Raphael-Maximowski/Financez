
export interface GoalDataInterface {
    amountPendent: number;
    amountSaved: number;
    id?: number;
    index?: number;
    name: string;
    percentageAchieved: number;
    value: string;
    description?: string;
    transactionsAssociated: goalTransactionAssociated[]
}

export interface goalTransactionAssociated {
    associatedGoal: number;
    date: string | Date;
    id: number;
    name: string;
    notFormatedDate: Date | string;
    value: string;
}