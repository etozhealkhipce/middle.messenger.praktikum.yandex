function stringToObject(value: string): object {
	const result = value.split('.').reduceRight((acc, val, index, arr) => {
		if (index === arr.length - 1) {
			return { [val]: {} };
		}
		return { [val]: acc };
	}, {});

	return result;
}

export default stringToObject;
