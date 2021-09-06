import HTTP from '../../core/HTTP';

export default class Password {
	userAPIInstance = new HTTP('/user');

	async update(data: UpdateUserPassword) {
		const response = await this.userAPIInstance.put('/password', {
			data,
		});
		return response;
	}
}
