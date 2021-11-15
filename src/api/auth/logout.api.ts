import HTTP from '../../core/HTTP';

export default class Logout {
	authAPIInstance = new HTTP('/auth');

	async request() {
		const response: any = await this.authAPIInstance.post('/logout');
		return response;
	}
}
