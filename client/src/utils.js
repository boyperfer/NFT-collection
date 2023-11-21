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
