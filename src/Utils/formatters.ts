export const handleTimeRange = (timeRange) => {
    const date = new Date()
    let startDate = null
    let endDate = null
    let name = null

    switch (timeRange) {
        case 'week':
            const firstDayOfWeek = new Date(date);
            firstDayOfWeek.setDate(date.getDate() - date.getDay());

            const lastDayOfWeek = new Date(date);
            lastDayOfWeek.setDate(date.getDate() + (6 - date.getDay()));

            startDate = firstDayOfWeek
            endDate = lastDayOfWeek
            break;
        case 'month':
            const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            startDate = firstDayOfMonth
            endDate = lastDayOfMonth
            break;
        case 'year':
            const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
            const lastDayOfYear = new Date(date.getFullYear(), 11, 31);

            startDate = firstDayOfYear
            endDate = lastDayOfYear
            break;
    }

    return ({startDate: startDate, endDate: endDate, name: timeRange})
}

export const handleCustomMonthTimeRange = (monthIndex) => {
    const year = new Date().getFullYear()
    return {
        startDate: new Date(year, monthIndex, 1),
        endDate: new Date(year, monthIndex + 1, 0),
        name: 'month'
    }
}