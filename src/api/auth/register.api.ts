import BaseAPI from '../index';

export default class Register extends BaseAPI {
	async create(data: UserData) {
		const response = await this.authAPIInstance.post('/signup', {
			data,
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}
}
