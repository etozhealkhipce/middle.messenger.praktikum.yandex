import BaseAPI from './index';

export default class Login extends BaseAPI {
	async create(data: UserData) {
		console.log(this.authAPIInstance);
		const response = await this.authAPIInstance.post('/signin', {
			data,
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}
}
