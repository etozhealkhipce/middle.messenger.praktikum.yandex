import HTTP from '../../core/HTTP';

export default class User {
	authAPIInstance = new HTTP('/auth');

	async request() {
		const response: any = await this.authAPIInstance.get('/user');
		return response;
	}

	async update(data: Partial<UpdateUserData>) {
		const response: any = await this.authAPIInstance.put('/user/profile', {
			data,
		});
		return response;
	}
}
