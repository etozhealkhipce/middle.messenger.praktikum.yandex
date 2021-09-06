import HTTP from '../../core/HTTP';

export default class Create {
	chatsAPIInstance = new HTTP('/chats');

	async request() {
		const response = await this.chatsAPIInstance.get('/');
		return response;
	}

	async create(title: string) {
		const response: any = await this.chatsAPIInstance.post('/', {
			data: {
				title,
			},
		});
		return response;
	}

	async delete(chatId: string) {
		const response: any = await this.chatsAPIInstance.delete('/', {
			data: {
				chatId,
			},
		});
		return response;
	}
}
