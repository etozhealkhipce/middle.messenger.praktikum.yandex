import BaseAPI from './index';

export default class Add extends BaseAPI {
	async update(data: Record<string, any>) {
		const response = await this.chatsAPIInstance.put('/users', {
			data,
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}
}
