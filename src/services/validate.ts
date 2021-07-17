export enum Test {
	login = '^[a-zA-Z-0-9]{2,30}$',
	password = '^[a-zA-Z-0-9]{8,}$',
	email = '\\S+@\\S+\\.\\S+',
	phone = '^.{8,}$',
}

export const validate = (value: string, test: string): Boolean => {
	const regexp = new RegExp(test);

	return !!regexp.test(value);
};

export const toggle = (result: Boolean, element: HTMLElement): Boolean => {
	if (result) {
		element.classList.remove('hidden');
		return false;
	}
	element.classList.add('hidden');
	return true;
};

export const multipleListener = (
	element: HTMLElement,
	eventNames: string,
	callback: Function
): void => {
	eventNames.split(', ').forEach((eventName): Function | void => {
		if (element) {
			return element.addEventListener(eventName, () => {
				callback();
			});
		}
		return undefined;
	});
};
