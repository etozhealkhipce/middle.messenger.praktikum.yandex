type Indexed<T = unknown> = {
	[key in string]: T;
};

function get(object: Indexed | unknown, path: string, value?: unknown) {
	const newPath = path.split('.');
	// @ts-ignore
	let newObj = { ...object };

	for (let i = 0; i < newPath.length; i += 1) {
		if (newObj) {
			newObj = newObj[newPath[i]];
		}
	}

	if (newObj) {
		return newObj;
	}

	return value;
}

export default get;
