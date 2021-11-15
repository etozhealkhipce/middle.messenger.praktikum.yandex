type PlainObject<T = unknown> = {
	[k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.constructor === Object &&
		Object.prototype.toString.call(value) === '[object Object]'
	);
}

function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
	return isPlainObject(value) || isArray(value);
}

function cloneDeep<T extends object = object>(obj: T) {
	let copy: any;

	if (isArrayOrObject(obj)) {
		if (isArray(obj)) {
			copy = [];

			for (var i = 0; i < obj.length; i++) {
				const t = obj as any;

				if (isArrayOrObject(t[i])) {
					copy[i] = cloneDeep(t[i]);
				} else {
					copy[i] = t[i];
				}
			}
		}

		if (isPlainObject(obj)) {
			copy = {};
			const keys = Object.keys(obj);

			for (var i = 0; i < keys.length; i++) {
				const t = obj as any;

				if (isArrayOrObject(t[keys[i]])) {
					copy[keys[i]] = cloneDeep(t[keys[i]]);
				} else {
					copy[keys[i]] = t[keys[i]];
				}
			}
		}
	} else {
		copy = obj;
	}

	return copy;
}

export default cloneDeep;
