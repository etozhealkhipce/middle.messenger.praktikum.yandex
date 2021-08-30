import BaseAPI from './index';

export default class Login extends BaseAPI {
	async create(data: LoginUserData) {
		const response: any = await this.authAPIInstance.post('/signin', {
			data,
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}
}
