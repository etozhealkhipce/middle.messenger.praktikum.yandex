import BaseAPI from '../index';

export default class User extends BaseAPI {
	async request() {
		const response = await this.authAPIInstance.get('/user');
		return response;
	}
}
