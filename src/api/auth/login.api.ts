import HTTP from '../../core/HTTP';

export default class Login {
	authAPIInstance = new HTTP('/auth');

	async create(data: LoginUserData) {
		const response: any = await this.authAPIInstance.post('/signin', {
			data,
		});
		return response;
	}
}
