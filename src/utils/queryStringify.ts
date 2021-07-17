type StringIndexed = Record<string, any>;

type PlainObject<T = unknown> = {
	[k in string]: T;
};

function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}

function isPlainObject(value: unknown): value is PlainObject {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.constructor === Object &&
		Object.prototype.toString.call(value) === '[object Object]'
	);
}

function queryStringify(data: StringIndexed, urlEncode?: any) {
	function normalizeObj(val: any, path: any[] = []): any[] {
		const result: any[] = [];

		Object.keys(val).forEach((key) => {
			if (!Object.prototype.hasOwnProperty.call(val, key)) return;

			const newPath = path.slice();
			newPath.push(key);
			let values: any[] = [];

			if (isPlainObject(val[key])) {
				values = normalizeObj(val[key], newPath);
			} else if (isArray(val[key])) {
				values = normalizeObj(val[key], newPath);
			} else {
				values.push({ path: newPath, val: val[key] });
			}

			values.forEach((item) => result.push(item));
		});

		return result;
	}

	let result = normalizeObj(data);

	result = result.map((val) => {
		if (val.path.length === 1) {
			const [one] = val.path;
			val.path = one;
		} else {
			const first = val.path[0];
			const rest = val.path.slice(1);
			val.path = `${first}[${rest.join('][')}]`;
		}
		return val;
	});

	const queryString = result.map((val) => `${val.path}=${val.val}`).join('&');

	if (urlEncode) return encodeURIComponent(queryString);
	return queryString;
}

export default queryStringify;
