type Indexed<T = unknown> = {
	[key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
	// eslint-disable-next-line no-restricted-syntax
	for (const p in rhs) {
		// eslint-disable-next-line no-prototype-builtins
		if (!rhs.hasOwnProperty(p)) {
			// eslint-disable-next-line no-continue
			continue;
		}

		try {
			// @ts-ignore
			if (rhs[p].constructor === Object) {
				rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
			} else {
				lhs[p] = rhs[p];
			}
		} catch (e) {
			lhs[p] = rhs[p];
		}
	}

	return lhs;
}

export default merge;
