import BaseAPI from './index';

export default class Create extends BaseAPI {
	async request() {
		const response = await this.chatsAPIInstance.get('/');
		return response;
	}

	async create(title: string) {
		const response: any = await this.chatsAPIInstance.post('/', {
			data: {
				title,
			},
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}

	async delete(chatId: string) {
		const response: any = await this.chatsAPIInstance.delete('/', {
			data: {
				chatId,
			},
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}
}
