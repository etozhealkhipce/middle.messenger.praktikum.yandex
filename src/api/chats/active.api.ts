import BaseAPI from './index';

export default class Active extends BaseAPI {
	async request() {
		const response = await this.chatsAPIInstance.get('/');
		return response;
	}
}
