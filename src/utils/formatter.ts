export const currencyFormatter = new Intl.NumberFormat("en-SG", {
	style: "currency",
	currency: "SGD",
	minimumFractionDigits: 2,
});

export const dateTimeFormatter = new Intl.DateTimeFormat("en-SG", {
	dateStyle: "medium",
	timeStyle: "medium",
	hour12: true,
	timeZone: "Asia/Singapore",
});

export function formatSqliteDateToSGT(sqliteDate: string): string {
	// Replace space with 'T' and add 'Z' to indicate UTC for proper parsing
	const utcDateString = sqliteDate.replace(" ", "T") + "Z";
	const utcDate = new Date(utcDateString);
	return dateTimeFormatter.format(utcDate);
}
