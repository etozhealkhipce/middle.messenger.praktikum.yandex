import HTTP from '../../core/HTTP';

export default class Avatar {
	resoucesAPIInstance = new HTTP('/resources');

	userAPIInstance = new HTTP('/user');

	async request(avatar: string) {
		const response = await this.resoucesAPIInstance.get(avatar, {
			responseType: 'arraybuffer',
		});
		return response;
	}

	async update(data: File) {
		const formData = new FormData();
		formData.append('avatar', data);

		const response = await this.userAPIInstance.put('/profile/avatar', {
			data: formData,
			headers: {},
		});
		return response;
	}
}
