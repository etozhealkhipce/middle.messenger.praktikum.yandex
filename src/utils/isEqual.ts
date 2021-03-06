type PlainObject<T = any> = {
	[k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
	if (value === undefined) return false;

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

function isEqual(lhs: PlainObject, rhs: PlainObject) {
	if (!isArrayOrObject(lhs) || !isArrayOrObject(rhs)) {
		if (lhs === rhs) {
			return true;
		}
		return false;
	}

	if (Object.keys(lhs).length !== Object.keys(rhs).length) {
		return false;
	}

	// eslint-disable-next-line no-restricted-syntax
	for (const [key, value] of Object.entries(lhs)) {
		const rightValue = rhs ? rhs[key] : false;
		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
			if (isEqual(value, rightValue)) {
				// eslint-disable-next-line no-continue
				continue;
			}
			return false;
		}

		if (value !== rightValue) {
			return false;
		}
	}

	return true;
}

export default isEqual;
