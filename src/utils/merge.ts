type Indexed<T = unknown> = {
	[key in string]: T;
};

export default function merge(lhs: Indexed<any>, rhs: Indexed<any>): Indexed {
	for (const p in rhs) {
		try {
			if (rhs[p].constructor == Object) {
				lhs[p] = merge(lhs[p], rhs[p]);
			} else {
				lhs[p] = rhs[p];
			}
		} catch (e) {
			lhs[p] = rhs[p];
		}
	}

	return lhs;
}
