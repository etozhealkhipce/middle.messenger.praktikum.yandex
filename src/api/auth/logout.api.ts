import BaseAPI from '../index';

export default class Logout extends BaseAPI {
	async request() {
		const response: any = await this.authAPIInstance.post('/logout');
		return response;
	}
}
