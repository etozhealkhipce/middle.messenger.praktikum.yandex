import BaseAPI from './index';

export default class User extends BaseAPI {
	async request(id: string) {
		const response = await this.userAPIInstance.get(`/${id}`);
		return response;
	}
}
