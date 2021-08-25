import HTTP from '../core/HTTP';

export default class BaseAPI {
	authAPIInstance = new HTTP('/auth');

	resourcesAPIInstance = new HTTP('/resources');

	create() {
		throw new Error('Not implemented');
	}

	request() {
		throw new Error('Not implemented');
	}

	update() {
		throw new Error('Not implemented');
	}

	delete() {
		throw new Error('Not implemented');
	}
}
