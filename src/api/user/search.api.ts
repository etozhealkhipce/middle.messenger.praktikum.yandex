import HTTP from '../../core/HTTP';

export default class Edit {
	userAPIInstance = new HTTP('/user');

	async request(login: string) {
		const response = await this.userAPIInstance.post('/search', {
			data: {
				login,
			},
		});
		return response;
	}
}
