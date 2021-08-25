import HTTP from '../../core/HTTP';

export default class BaseAPI {
	userAPIInstance = new HTTP('/user');

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
