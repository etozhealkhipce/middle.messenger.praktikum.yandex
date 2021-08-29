import BaseAPI from './index';

export default class Edit extends BaseAPI {
	async request(login: string) {
		const response = await this.userAPIInstance.post('/search', {
			data: {
				login,
			},
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}
}
