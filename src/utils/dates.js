const dtfOptions = {
    weekday: 'short',
	year: 'numeric',
	month: 'short',
	day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
};
const dateTimeFormat = new Intl.DateTimeFormat('en-US', dtfOptions);

export const DateFormat = date => {
    date = new Date(date);

    return dateTimeFormat.format(date);
}
