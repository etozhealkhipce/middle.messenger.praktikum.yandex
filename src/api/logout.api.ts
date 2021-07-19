import BaseAPI from './index';
import HTTP from '../core/HTTP';

const logoutAPIInstance = new HTTP('/auth');

export default class Logout extends BaseAPI {
	async request() {
		const response = await logoutAPIInstance.post('/logout');
		return response;
	}
}
