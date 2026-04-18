export const formatDateString = (
	dateString: string | undefined
): string | undefined => {
	if (dateString === undefined) return;
	const date = new Date(dateString);

	if (isNaN(date.getTime())) {
		return 'Invalid Date';
	}

	const options: Intl.DateTimeFormatOptions = {
		//weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
		//hour: '2-digit',
		//minute: '2-digit'
		// second: '2-digit',
		// timeZoneName: 'short'
	};

	return date.toLocaleString('en-US', options);
};
