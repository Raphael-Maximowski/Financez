const actualDate = new Date()
const actualMonth = actualDate.getMonth()
const actualYear = actualDate.getFullYear();

export const getTransactionReactiveMonth = (monthsToDecrement) => {
    let transactionMonth = actualMonth - monthsToDecrement
    transactionMonth < 0 && (transactionMonth = 12 + transactionMonth)
    return transactionMonth
}

const oneMonthBefore = getTransactionReactiveMonth(1)
const twoMonthsBefore = getTransactionReactiveMonth(2)

const twoMonthsBeforeToAppearInTemplate = twoMonthsBefore + 1
const oneMonthBeforeToAppearInTemplate = oneMonthBefore + 1
const actualMonthToAppearInTemplate = actualMonth + 1

export const incomesDataMockUp = [
    {
        id: 1,
        name: 'Income 1',
        value: '1250,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 1),
        date: `01/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`,
    },
    {
        id: 2,
        name: 'Income 2',
        value: '800,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 7),
        date: `07/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 3,
        name: 'Income 3',
        value: '2000,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 8),
        date: `08/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 4,
        name: 'Income 4',
        value: '2150,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 11),
        date: `11/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 5,
        name: 'Income 5',
        value: '2200,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 15),
        date: `15/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 6,
        name: 'Income 6',
        value: '1800,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 20),
        date: `20/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 7,
        name: 'Income 7',
        value: '1950,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 21),
        date: `21/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 8,
        name: 'Income 8',
        value: '2000,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 22),
        date: `22/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 9,
        name: 'Income 9',
        value: '1000,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 25),
        date: `25/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 10,
        name: 'Income 10',
        value: '850,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 26),
        date: `26/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 11,
        name: 'Income 11',
        value: '1300,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 27),
        date: `27/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },

    {
        id: 12,
        name: 'Income 12',
        value: '1500,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 2),
        date: `02/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 13,
        name: 'Income 13',
        value: '1100,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 5),
        date: `05/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 14,
        name: 'Income 14',
        value: '2300,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 7),
        date: `07/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 15,
        name: 'Income 15',
        value: '1700,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 10),
        date: `10/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 16,
        name: 'Income 16',
        value: '1500,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 12),
        date: `12/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 17,
        name: 'Income 17',
        value: '2500,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 13),
        date: `13/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 18,
        name: 'Income 18',
        value: '1400,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 17),
        date: `17/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 19,
        name: 'Income 19',
        value: '700,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 20),
        date: `20/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 20,
        name: 'Income 20',
        value: '1800,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 22),
        date: `22/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 21,
        name: 'Income 21',
        value: '1100,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 25),
        date: `25/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 22,
        name: 'Income 22',
        value: '400,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 26),
        date: `26/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },

    {
        id: 23,
        name: 'Income 23',
        value: '800,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 1),
        date: `01/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 24,
        name: 'Income 24',
        value: '500,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 3),
        date: `03/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 25,
        name: 'Income 25',
        value: '1000,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 5),
        date: `05/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 26,
        name: 'Income 26',
        value: '1200,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 6),
        date: `06/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 27,
        name: 'Income 27',
        value: '100,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 6),
        date: `06/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 28,
        name: 'Income 28',
        value: '1100,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 8),
        date: `08/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 29,
        name: 'Income 29',
        value: '400,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 10),
        date: `10/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 30,
        name: 'Income 30',
        value: '1000,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 11),
        date: `11/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 31,
        name: 'Income 31',
        value: '1200,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 12),
        date: `12/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 32,
        name: 'Income 32',
        value: '900,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 14),
        date: `14/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 33,
        name: 'Income 33',
        value: '2000,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 15),
        date: `15/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 34,
        name: 'Income 34',
        value: '800,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 16),
        date: `16/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 35,
        name: 'Income 35',
        value: '500,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 18),
        date: `18/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 36,
        name: 'Income 36',
        value: '1000,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 18),
        date: `18/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 37,
        name: 'Income 37',
        value: '1200,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 20),
        date: `20/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 38,
        name: 'Income 38',
        value: '1700,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 22),
        date: `22/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 39,
        name: 'Income 39',
        value: '1300,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 24),
        date: `24/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 40,
        name: 'Income 40',
        value: '500,00',
        state: 'Pendent',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 26),
        date: `26/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 41,
        name: 'Income 41',
        value: '1500,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 25),
        date: `25/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 42,
        name: 'Income 42',
        value: '1800,00',
        state: 'Paid',
        type: 'Income',
        notFormatedDate: new Date(actualYear, actualMonth, 28),
        date: `28/0${actualMonthToAppearInTemplate}/${actualYear}`
    },

];

export const expensesDataMockUp = [
    {
        id: 1,
        name: 'Expense 1',
        value: '600,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 1),
        date: `01/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 2,
        name: 'Expense 2',
        value: '1000,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 7),
        date: `07/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 3,
        name: 'Expense 3',
        value: '1300,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 8),
        date: `08/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 5,
        name: 'Expense 5',
        value: '1000,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 15),
        date: `15/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 6,
        name: 'Expense 6',
        value: '1500,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 20),
        date: `20/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 7,
        name: 'Expense 7',
        value: '1900,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 21),
        date: `21/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 8,
        name: 'Expense 8',
        value: '800,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 22),
        date: `22/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 9,
        name: 'Expense 9',
        value: '500,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 25),
        date: `25/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 10,
        name: 'Expense 10',
        value: '1100,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 26),
        date: `26/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 11,
        name: 'Expense 11',
        value: '800,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 27),
        date: `27/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },

    {
        id: 12,
        name: 'Expense 12',
        value: '1400,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 2),
        date: `02/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 13,
        name: 'Expense 13',
        value: '1700,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 5),
        date: `05/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 14,
        name: 'Expense 14',
        value: '1200,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 7),
        date: `07/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 15,
        name: 'Expense 15',
        value: '800,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 10),
        date: `10/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 16,
        name: 'Expense 16',
        value: '500,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 12),
        date: `12/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 17,
        name: 'Expense 17',
        value: '1500,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 13),
        date: `13/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 18,
        name: 'Expense 18',
        value: '2000,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 17),
        date: `17/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 19,
        name: 'Expense 19',
        value: '1000,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 20),
        date: `20/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 20,
        name: 'Expense 20',
        value: '700,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 22),
        date: `22/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 21,
        name: 'Expense 21',
        value: '600,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 25),
        date: `25/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 22,
        name: 'Expense 22',
        value: '1100,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 26),
        date: `26/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },

    {
        id: 23,
        name: 'Expense 23',
        value: '800,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 2),
        date: `02/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 24,
        name: 'Expense 24',
        value: '1000,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 3),
        date: `03/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 25,
        name: 'Expense 25',
        value: '100,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 3),
        date: `03/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 26,
        name: 'Expense 26',
        value: '700,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 5),
        date: `05/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 27,
        name: 'Expense 27',
        value: '700,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 8),
        date: `08/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 28,
        name: 'Expense 28',
        value: '1200,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 9),
        date: `09/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 29,
        name: 'Expense 29',
        value: '600,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 11),
        date: `11/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 30,
        name: 'Expense 30',
        value: '800,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 12),
        date: `12/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 31,
        name: 'Expense 31',
        value: '700,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 15),
        date: `15/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 32,
        name: 'Expense 32',
        value: '1300,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 16),
        date: `16/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 33,
        name: 'Expense 33',
        value: '1000,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 18),
        date: `18/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 34,
        name: 'Expense 34',
        value: '1500,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 20),
        date: `20/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 35,
        name: 'Expense 35',
        value: '1200,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 21),
        date: `21/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 36,
        name: 'Expense 36',
        value: '900,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 22),
        date: `22/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 37,
        name: 'Expense 37',
        value: '700,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 24),
        date: `24/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 38,
        name: 'Expense 38',
        value: '1300,00',
        state: 'Pendent',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 26),
        date: `26/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 39,
        name: 'Expense 39',
        value: '1500,00',
        state: 'Paid',
        type: 'Expense',
        notFormatedDate: new Date(actualYear, actualMonth, 28),
        date: `28/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
];

export const savingsDataMockUp = [
    {
        id: 1,
        name: 'Emergency Money',
        associatedGoal: 4,
        value: '500,00',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 1),
        date: `01/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 2,
        name: 'Buy a House',
        associatedGoal: 3,
        value: '200,00',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 6),
        date: `06/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 3,
        name: 'Invest in Cripto',
        associatedGoal: 1,
        value: '250,00',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 7),
        date: `07/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 4,
        name: 'Invest in Cripto',
        associatedGoal: 1,
        value: '800,00',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 15),
        date: `15/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 5,
        name: 'Emergency Money',
        associatedGoal: 4,
        value: '600,00',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 17),
        date: `17/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 6,
        name: 'Buy a House',
        associatedGoal: 3,
        value: '300,00',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 20),
        date: `20/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 7,
        name: 'Buy a House',
        associatedGoal: 3,
        value: '400,00',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 21),
        date: `21/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 8,
        name: 'Emergency Money',
        associatedGoal: 4,
        value: '550,00',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 22),
        date: `22/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 9,
        name: 'Emergency Money',
        associatedGoal: 4,
        value: '220,00',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 25),
        date: `25/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 10,
        name: 'Invest in Cripto',
        associatedGoal: 1,
        value: '900,00',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 27),
        date: `27/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 11,
        name: 'Emergency Money',
        associatedGoal: 4,
        value: '320,00',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 28),
        date: `28/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 12,
        name: 'Upgrade my Computer',
        associatedGoal: 2,
        value: '700,00',
        notFormatedDate: new Date(actualYear, twoMonthsBefore, 29),
        date: `29/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
    },

    {
        id: 13,
        name: 'Buy a House',
        associatedGoal: 3,
        value: '430,00',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 2),
        date: `02/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 14,
        name: 'Buy a Car',
        associatedGoal: 5,
        value: '510,00',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 5),
        date: `05/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 15,
        name: 'Emergency Money',
        associatedGoal: 4,
        value: '850,00',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 7),
        date: `07/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 16,
        name: 'Buy a Car',
        associatedGoal: 5,
        value: '300,00',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 8),
        date: `08/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 17,
        name: 'Emergency Money',
        associatedGoal: 4,
        value: '620,00',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 11),
        date: `11/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 18,
        name: 'Emergency Money',
        associatedGoal: 4,
        value: '1200,00',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 15),
        date: `15/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 19,
        name: 'Upgrade my Computer',
        associatedGoal: 2,
        value: '1100,00',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 16),
        date: `16/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 20,
        name: 'Upgrade my Computer',
        associatedGoal: 2,
        value: '770,00',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 17),
        date: `17/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 21,
        name: 'Buy a Car',
        associatedGoal: 5,
        value: '2000,00',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 21),
        date: `21/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 22,
        name: 'Emergency Money',
        associatedGoal: 4,
        value: '450,00',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 25),
        date: `25/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 23,
        name: 'Upgrade my Computer',
        associatedGoal: 2,
        value: '330,00',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 26),
        date: `26/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },
    {
        id: 24,
        name: 'Emergency Money',
        associatedGoal: 4,
        value: '290,00',
        notFormatedDate: new Date(actualYear, oneMonthBefore, 27),
        date: `27/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
    },

    {
        id: 25,
        name: 'Emergency Money',
        associatedGoal: 4,
        value: '180,00',
        notFormatedDate: new Date(actualYear, actualMonth, 9),
        date: `09/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 26,
        name: 'Buy a House',
        associatedGoal: 3,
        value: '900,00',
        notFormatedDate: new Date(actualYear, actualMonth, 10),
        date: `10/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 27,
        name: 'Upgrade my Computer',
        associatedGoal: 2,
        value: '620,00',
        notFormatedDate: new Date(actualYear, actualMonth, 15),
        date: `15/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 28,
        name: 'Upgrade my Computer',
        associatedGoal: 2,
        value: '990,00',
        notFormatedDate: new Date(actualYear, actualMonth, 17),
        date: `17/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 29,
        name: 'Invest in Cripto',
        associatedGoal: 1,
        value: '780,00',
        notFormatedDate: new Date(actualYear, actualMonth, 20),
        date: `20/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 30,
        name: 'Buy a House',
        associatedGoal: 3,
        value: '870,00',
        notFormatedDate: new Date(actualYear, actualMonth, 22),
        date: `22/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 31,
        name: 'Buy a House',
        associatedGoal: 3,
        value: '1500,00',
        notFormatedDate: new Date(actualYear, actualMonth, 25),
        date: `25/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 32,
        name: 'Upgrade my Computer',
        associatedGoal: 2,
        value: '450,00',
        notFormatedDate: new Date(actualYear, actualMonth, 27),
        date: `27/0${actualMonthToAppearInTemplate}/${actualYear}`
    },
    {
        id: 33,
        name: 'Invest in Cripto',
        associatedGoal: 1,
        value: '550,00',
        notFormatedDate: new Date(actualYear, actualMonth, 28),
        date: `28/0${actualMonthToAppearInTemplate}/${actualYear}`
    }
];

export const goalsMockUp = [
    {
        id: 1,
        name: 'Invest in Cripto',
        index: 0,
        value: '2000,00',
        amountSaved: 0,
        amountPendent: 0,
        percentageAchieved: 0,
        transactionsAssociated: [
            {
                id: 3,
                name: 'Invest in Cripto',
                associatedGoal: 1,
                value: '250,00',
                notFormatedDate: new Date(actualYear, twoMonthsBefore, 7),
                date: `07/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 4,
                name: 'Invest in Cripto',
                associatedGoal: 1,
                value: '800,00',
                notFormatedDate: new Date(actualYear, twoMonthsBefore, 15),
                date: `15/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 10,
                name: 'Invest in Cripto',
                associatedGoal: 1,
                value: '900,00',
                notFormatedDate: new Date(actualYear, twoMonthsBefore, 27),
                date: `27/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 29,
                name: 'Invest in Cripto',
                associatedGoal: 1,
                value: '780,00',
                notFormatedDate: new Date(actualYear, actualMonth, 20),
                date: `2/0${actualMonthToAppearInTemplate}/${actualYear}`
            },
            {
                id: 33,
                name: 'Invest in Cripto',
                associatedGoal: 1,
                value: '550,00',
                notFormatedDate: new Date(actualYear, actualMonth, 28),
                date: `28/0${actualMonthToAppearInTemplate}/${actualYear}`
            }
        ]
    },
    {
        id: 2,
        name: 'Upgrade my Computer',
        index: 1,
        value: '1000,00',
        amountSaved: 0,
        amountPendent: 0,
        percentageAchieved: 0,
        transactionsAssociated: [
            {
                id: 12,
                name: 'Upgrade my Computer',
                associatedGoal: 2,
                value: '700,00',
                notFormatedDate: new Date(actualYear, twoMonthsBefore, 29),
                date: `29/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 19,
                name: 'Upgrade my Computer',
                associatedGoal: 2,
                value: '1100,00',
                notFormatedDate: new Date(actualYear, oneMonthBefore, 16),
                date: `16/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 20,
                name: 'Upgrade my Computer',
                associatedGoal: 2,
                value: '770,00',
                notFormatedDate: new Date(actualYear, oneMonthBefore, 17),
                date: `17/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 23,
                name: 'Upgrade my Computer',
                associatedGoal: 2,
                value: '330,00',
                notFormatedDate: new Date(actualYear, oneMonthBefore, 26),
                date: `26/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 27,
                name: 'Upgrade my Computer',
                associatedGoal: 2,
                value: '620,00',
                notFormatedDate: new Date(actualYear, actualMonth, 15),
                date: `15/0${actualMonthToAppearInTemplate}/${actualYear}`
            },
            {
                id: 28,
                name: 'Upgrade my Computer',
                associatedGoal: 2,
                value: '990,00',
                notFormatedDate: new Date(actualYear, actualMonth, 17),
                date: `17/0${actualMonthToAppearInTemplate}/${actualYear}`
            },
            {
                id: 32,
                name: 'Upgrade my Computer',
                associatedGoal: 2,
                value: '450,00',
                notFormatedDate: new Date(actualYear, actualMonth, 27),
                date: `27/0${actualMonthToAppearInTemplate}/${actualYear}`
            },
        ]
    },
    {
        id: 3,
        name: 'Buy a House',
        index: 2,
        value: '250000,00',
        amountSaved: 0,
        amountPendent: 0,
        percentageAchieved: 0,
        transactionsAssociated: [
            {
                id: 2,
                name: 'Buy a House',
                associatedGoal: 3,
                value: '200,00',
                notFormatedDate: new Date(actualYear, twoMonthsBefore, 6),
                date: `06/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 6,
                name: 'Buy a House',
                associatedGoal: 3,
                value: '300,00',
                notFormatedDate: new Date(actualYear, twoMonthsBefore, 20),
                date: `20/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 7,
                name: 'Buy a House',
                associatedGoal: 3,
                value: '400,00',
                notFormatedDate: new Date(actualYear, twoMonthsBefore, 21),
                date: `21/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 13,
                name: 'Buy a House',
                associatedGoal: 3,
                value: '430,00',
                notFormatedDate: new Date(actualYear, oneMonthBefore, 2),
                date: `02/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 26,
                name: 'Buy a House',
                associatedGoal: 3,
                value: '900,00',
                notFormatedDate: new Date(actualYear, actualMonth, 10),
                date: `10/0${actualMonthToAppearInTemplate}/${actualYear}`
            },
            {
                id: 30,
                name: 'Buy a House',
                associatedGoal: 3,
                value: '870,00',
                notFormatedDate: new Date(actualYear, actualMonth, 22),
                date: `22/0${actualMonthToAppearInTemplate}/${actualYear}`
            },
            {
                id: 31,
                name: 'Buy a House',
                associatedGoal: 3,
                value: '1500,00',
                notFormatedDate: new Date(actualYear, actualMonth, 25),
                date: `25/0${actualMonthToAppearInTemplate}/${actualYear}`
            },
        ]
    },
    {
        id: 4,
        name: 'Emergency Money',
        index: 3,
        value: '10000,00',
        amountSaved: 0,
        amountPendent: 0,
        percentageAchieved: 0,
        transactionsAssociated: [
            {
                id: 1,
                name: 'Emergency Money',
                associatedGoal: 4,
                value: '500,00',
                notFormatedDate: new Date(actualYear, twoMonthsBefore, 1),
                date: `01/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 5,
                name: 'Emergency Money',
                associatedGoal: 4,
                value: '600,00',
                notFormatedDate: new Date(actualYear, twoMonthsBefore, 17),
                date: `17/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 8,
                name: 'Emergency Money',
                associatedGoal: 4,
                value: '550,00',
                notFormatedDate: new Date(actualYear, twoMonthsBefore, 22),
                date: `22/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 9,
                name: 'Emergency Money',
                associatedGoal: 4,
                value: '220,00',
                notFormatedDate: new Date(actualYear, twoMonthsBefore, 25),
                date: `25/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 11,
                name: 'Emergency Money',
                associatedGoal: 4,
                value: '320,00',
                notFormatedDate: new Date(actualYear, twoMonthsBefore, 28),
                date: `28/0${twoMonthsBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 15,
                name: 'Emergency Money',
                associatedGoal: 4,
                value: '850,00',
                notFormatedDate: new Date(actualYear, oneMonthBefore, 7),
                date: `07/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 17,
                name: 'Emergency Money',
                associatedGoal: 4,
                value: '620,00',
                notFormatedDate: new Date(actualYear, oneMonthBefore, 11),
                date: `11/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 18,
                name: 'Emergency Money',
                associatedGoal: 4,
                value: '1200,00',
                notFormatedDate: new Date(actualYear, oneMonthBefore, 15),
                date: `15/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 22,
                name: 'Emergency Money',
                associatedGoal: 4,
                value: '450,00',
                notFormatedDate: new Date(actualYear, oneMonthBefore, 25),
                date: `25/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 24,
                name: 'Emergency Money',
                associatedGoal: 4,
                value: '290,00',
                notFormatedDate: new Date(actualYear, oneMonthBefore, 27),
                date: `27/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 25,
                name: 'Emergency Money',
                associatedGoal: 4,
                value: '180,00',
                notFormatedDate: new Date(actualYear, actualMonth, 9),
                date: `09/0${actualMonthToAppearInTemplate}/${actualYear}`
            },
        ]
    },
    {
        id: 5,
        name: 'Buy a Car',
        index: 4,
        value: '65000,00',
        amountSaved: 0,
        amountPendent: 0,
        percentageAchieved: 0,
        transactionsAssociated: [
            {
                id: 14,
                name: 'Buy a Car',
                associatedGoal: 5,
                value: '510,00',
                notFormatedDate: new Date(actualYear, oneMonthBefore, 5),
                date: `05/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 16,
                name: 'Buy a Car',
                associatedGoal: 5,
                value: '300,00',
                notFormatedDate: new Date(actualYear, oneMonthBefore, 8),
                date: `08/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
            },
            {
                id: 21,
                name: 'Buy a Car',
                associatedGoal: 5,
                value: '2000,00',
                notFormatedDate: new Date(actualYear, oneMonthBefore, 21),
                date: `21/0${oneMonthBeforeToAppearInTemplate}/${actualYear}`
            },
        ]
    },

]