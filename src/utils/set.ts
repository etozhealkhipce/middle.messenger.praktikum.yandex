import isPlainObject from './isPlainObject';
import merge from './merge';

type Indexed<T = unknown> = {
	[key in string]: T;
};

function set(
	object: Indexed | unknown,
	path: string,
	value: unknown
): Indexed | unknown {
	if (!isPlainObject(object)) {
		return object;
	}

	if (typeof path !== 'string') {
		throw new Error('path must be string');
	}

	const result = path.split('.').reduceRight<Indexed>(
		(acc, key) => ({
			[key]: acc,
		}),
		value as any
	);

	return merge(object as Indexed, result);
}

export default set;
