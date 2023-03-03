export const getDates = (startDate: Date, endDate: Date) => {
    const dates = [];
    const currentDate = startDate;
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}