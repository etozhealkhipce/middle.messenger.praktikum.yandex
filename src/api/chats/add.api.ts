import BaseAPI from './index';

export default class Add extends BaseAPI {
	async update(users: ChatUsers, chatId: string) {
		const response = await this.chatsAPIInstance.put('/users', {
			data: {
				users,
				chatId,
			},
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}
}
