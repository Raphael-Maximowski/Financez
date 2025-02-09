export const convertToDateTime = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day); // Mês começa do índice 0 (jan = 0, fev = 1, ...)
}

export const setTimeRangeBasedInActualDate = (timeInDate, timeRange) => {
    const today = new Date(timeInDate)
    const dayOfWeek = today.getDay()

    switch (timeRange) {
        case 'week':
            let firstDayInWeek = new Date(today);
            firstDayInWeek.setDate(today.getDate() - ((dayOfWeek === 0 ? 6 : dayOfWeek - 1)));

            let lastDayInWeek = new Date(firstDayInWeek);
            lastDayInWeek.setDate(firstDayInWeek.getDate() + 6);

            return {
                startDate: firstDayInWeek,
                endDate: lastDayInWeek
            }
            break;
        case 'month':
            let firstDayInMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            let lastDayInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            return {
                startDate: firstDayInMonth,
                endDate: lastDayInMonth
            }
            break
        case 'year':
            const year = today.getFullYear();
            const firstDayInYear = new Date(year, 0, 1);
            const lastDayInYear = new Date(year, 11, 31);
            return {
                startDate: firstDayInYear,
                endDate: lastDayInYear
            }
            break;
    }

}