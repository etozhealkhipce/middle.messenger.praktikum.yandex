import BaseAPI from './index';

export default class Edit extends BaseAPI {
	async update(data: UserData) {
		const response = await this.userAPIInstance.put('/profile', {
			data,
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}
}
