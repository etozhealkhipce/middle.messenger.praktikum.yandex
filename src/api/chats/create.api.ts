import BaseAPI from './index';

export default class Create extends BaseAPI {
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
}
