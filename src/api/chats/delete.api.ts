import BaseAPI from './index';

export default class Delete extends BaseAPI {
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
