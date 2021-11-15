import HTTP from '../../core/HTTP';

export default class User {
	userAPIInstance = new HTTP('/user');

	async request(id: string) {
		const response = await this.userAPIInstance.get(`/${id}`);
		return response;
	}
}
