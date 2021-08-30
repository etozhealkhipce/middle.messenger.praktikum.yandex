import BaseAPI from './index';

export default class Users extends BaseAPI {
	async request(id: string) {
		const response = await this.chatsAPIInstance.get(`/${id}/users`);
		return response;
	}

	async update(data: Record<string, any>) {
		const response = await this.chatsAPIInstance.put('/users', {
			data,
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}

	async delete(data: string) {
		const response = await this.chatsAPIInstance.delete('/users', {
			data,
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}
}
