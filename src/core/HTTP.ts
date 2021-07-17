import queryStringify from '../utils/queryStringify';

enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	UPDATE = 'UPDATE',
	PATCH = 'PATCH',
}

export default class HTTPTransport {
	baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = process.env.API_URL + baseUrl;
	}

	get = (url: string, options: Record<string, any> = {}) =>
		this.request(url, { ...options, method: METHODS.GET });

	post = (url: string, options: Record<string, any> = {}) =>
		this.request(url, { ...options, method: METHODS.POST });

	put = (url: string, options: Record<string, any> = {}) =>
		this.request(url, { ...options, method: METHODS.PUT });

	delete = (url: string, options: Record<string, any> = {}) =>
		this.request(url, { ...options, method: METHODS.DELETE });

	request = (url: string, options: Record<string, any> = {}) => {
		const { method, data, timeout, headers = {} } = options;
		url = this.baseUrl + url;

		return new Promise((resolve, reject) => {
			if (!method) {
				reject(new Error('No method'));
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
					resolve(xhr.response);
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
