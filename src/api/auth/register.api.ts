import BaseAPI from '../index';

export default class Register extends BaseAPI {
	async create(data: RegisterUserData) {
		const response: any = await this.authAPIInstance.post('/signup', {
			data,
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}
}
