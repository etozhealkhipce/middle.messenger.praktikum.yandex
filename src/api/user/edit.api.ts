import HTTP from '../../core/HTTP';

export default class Edit {
	userAPIInstance = new HTTP('/user');

	async update(data: Partial<UpdateUserData>) {
		const response = await this.userAPIInstance.put('/profile', {
			data,
		});
		return response;
	}
}
