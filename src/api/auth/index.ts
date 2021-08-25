import HTTP from '../../core/HTTP';

export default class BaseAPI {
	authAPIInstance = new HTTP('/auth');

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
