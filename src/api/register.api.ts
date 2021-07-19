import BaseAPI from './index';
import HTTP from '../core/HTTP';

const registerAPIInstance = new HTTP('/auth');

export default class Register extends BaseAPI {
	async create(data: UserData) {
		const response = await registerAPIInstance.post('/signup', {
			data,
			headers: {
				'content-type': 'application/json',
			},
		});
		return response;
	}
}
