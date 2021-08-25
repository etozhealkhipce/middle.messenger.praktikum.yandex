import BaseAPI from './index';

export default class Password extends BaseAPI {
	async update(data: UserData) {
		const response = await this.userAPIInstance.put('/password', {
			data,
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}
}
