export const shortenAddress = (address) => {
	const prefixLength = 4;
	const suffixLength = 4;

	if (address.length <= prefixLength + suffixLength) {
		return address; // No need to shorten
	}

	const prefix = address.slice(0, Math.max(0, prefixLength));
	const suffix = address.slice(Math.max(0, address.length - suffixLength));

	return `${prefix}...${suffix}`;
};

export const getCentralTime = (time) => {
	// Convert UTC timestamp to a JavaScript Date object
	const date = new Date(time);

	// Specify the timezone (in this case, "America/Chicago" for Central Time)
	const timeZone = "America/Chicago";

	// Create a formatter with the desired options
	const formatter = new Intl.DateTimeFormat("en-US", {
	  timeZone,
	  year: "numeric",
	  month: "numeric",
	  day: "numeric",
	  hour: "numeric",
	  minute: "numeric",
	  second: "numeric",
	  timeZoneName: "short",
	});

	// Format the date and log the result
	const centralTime = formatter.format(date);
	return centralTime
}
