import HTTP from '../../core/HTTP';

export default class New {
	chatsAPIInstance = new HTTP('/chats');

	async request(id: string) {
		const response = await this.chatsAPIInstance.get(`/new/${id}`);
		return response;
	}
}
