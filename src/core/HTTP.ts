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
		this.request(url, {
			method: METHODS.GET,
			headers: {
				'content-type': 'application/json',
			},
			...options,
		});

	post = (url: string, options: Record<string, any> = {}) =>
		this.request(url, {
			method: METHODS.POST,
			headers: {
				'content-type': 'application/json',
			},
			...options,
		});

	put = (url: string, options: Record<string, any> = {}) =>
		this.request(url, {
			method: METHODS.PUT,
			headers: {
				'content-type': 'application/json',
			},
			...options,
		});

	delete = (url: string, options: Record<string, any> = {}) =>
		this.request(url, {
			method: METHODS.DELETE,
			headers: {
				'content-type': 'application/json',
			},
			...options,
		});

	request = (url: string, options: Record<string, any> = {}) => {
		const { method, data, timeout, responseType, headers = {} } = options;

		url = this.baseUrl + url;

		return new Promise((resolve, reject) => {
			if (!method) {
				reject(new Error('No method'));
				return;
			}

			const xhr = new XMLHttpRequest();

			if (responseType) {
				xhr.responseType = responseType;
			}

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
					try {
						resolve(JSON.parse(xhr.response));
					} catch (error) {
						resolve(xhr.response);
					}
				} else {
					reject(JSON.parse(xhr.response));
				}
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			xhr.withCredentials = true;

			xhr.send(data instanceof FormData ? data : JSON.stringify(data));
		});
	};
}
