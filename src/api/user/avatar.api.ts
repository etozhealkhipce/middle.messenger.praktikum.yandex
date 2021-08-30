import BaseAPI from './index';

export default class Avatar extends BaseAPI {
	async update(data: UserData) {
		const response = await this.userAPIInstance.put('/profile/avatar', {
			data,
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}
}
