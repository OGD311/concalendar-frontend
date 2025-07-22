export function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

export function displayDates(dateStart: string, dateEnd: string): string {
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);

    const sameDay = startDate.getDate() === endDate.getDate() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getFullYear() === endDate.getFullYear();

    const sameMonth = startDate.getMonth() === endDate.getMonth() &&
        startDate.getFullYear() === endDate.getFullYear();

    const sameYear = startDate.getFullYear() === endDate.getFullYear();

    if (sameDay) {
        return formatDate(dateStart);
    } else if (!sameMonth) {
        const start = formatDate(dateStart).replace(/ \d{4}$/, '');
        return `${start} - ${formatDate(dateEnd)}`;
    } else if (!sameYear) {
        return `${formatDate(dateStart)} - ${formatDate(dateEnd)}`;
    } else {
        return `${startDate.getDate()} - ${formatDate(dateEnd)}`;
    }
}
