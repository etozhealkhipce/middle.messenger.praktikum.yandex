import HTTP from '../../core/HTTP';

export default class Register {
	authAPIInstance = new HTTP('/auth');

	async create(data: RegisterUserData) {
		const response: any = await this.authAPIInstance.post('/signup', {
			data,
		});
		return response;
	}
}
