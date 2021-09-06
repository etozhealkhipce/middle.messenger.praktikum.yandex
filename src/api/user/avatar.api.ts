import HTTP from '../../core/HTTP';

export default class Avatar {
	userAPIInstance = new HTTP('/user');

	async update(data) {
		const response = await this.userAPIInstance.put('/profile/avatar', {
			data,
		});
		return response;
	}
}
