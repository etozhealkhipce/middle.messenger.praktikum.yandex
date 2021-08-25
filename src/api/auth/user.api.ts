import BaseAPI from '../index';

export default class User extends BaseAPI {
	async request() {
		const response: any = await this.authAPIInstance.get('/user');
		return JSON.parse(response);
	}

	async update(data: UpdateUserData) {
		const response: any = await this.authAPIInstance.put('/user/profile', {
			data,
			headers: {
				'content-type': 'application/json',
			},
		});
		return JSON.parse(response);
	}
}
