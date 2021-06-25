const enum METHODS {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
	UPDATE = "UPDATE",
	PATCH = "PATCH",
}

function queryStringify(data: Record<string, any>): string | null {
	if (data) {
		const params = Object.entries(data).reduce(
			(acc, [key, value], index) =>
				acc + (index ? `&${key}=${value}` : `${key}=${value}`),
			"?"
		);
		return params;
	}
	return null;
}

export default class HTTPTransport {
	get = (url: string, options: Record<string, any> = {}) =>
		this.request(url, { ...options, method: METHODS.GET });

	post = (url: string, options: Record<string, any> = {}) =>
		this.request(url, { ...options, method: METHODS.POST });

	put = (url: string, options: Record<string, any> = {}) =>
		this.request(url, { ...options, method: METHODS.PUT });

	delete = (url: string, options: Record<string, any> = {}) =>
		this.request(url, { ...options, method: METHODS.DELETE });

	request = <T>(url: string, options: Record<string, any> = {}): Promise<T> => {
		const { method, data, timeout, headers = {} } = options;

		return new Promise((resolve, reject) => {
			if (!method) {
				reject(new Error("No method"));
				return;
			}

			const xhr = new XMLHttpRequest();

			if (method === METHODS.GET && !!data) {
				xhr.open(method, url + queryStringify(data));
			} else {
				xhr.open(method, url);
			}

			Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = function () {
				if (xhr.status === 200) {
					// TODO: при использовании исправить
					resolve(new Promise(() => xhr));
				} else {
					reject(new Error(xhr.status.toString()));
				}
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			xhr.send(data);
		});
	};
}
