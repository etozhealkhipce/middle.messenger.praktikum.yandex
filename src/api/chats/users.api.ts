import HTTP from '../../core/HTTP';

export default class Users {
	chatsAPIInstance = new HTTP('/chats');

	async request(id: string) {
		const response = await this.chatsAPIInstance.get(`/${id}/users`);
		return response;
	}

	async update(data: Record<string, any>) {
		const response = await this.chatsAPIInstance.put('/users', {
			data,
		});
		return response;
	}

	async delete(data: string) {
		const response = await this.chatsAPIInstance.delete('/users', {
			data,
		});
		return response;
	}
}
