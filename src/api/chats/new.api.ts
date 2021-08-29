import BaseAPI from './index';

export default class New extends BaseAPI {
	async request(id: string) {
		const response = await this.chatsAPIInstance.get(`/new/${id}`);
		return response;
	}
}
