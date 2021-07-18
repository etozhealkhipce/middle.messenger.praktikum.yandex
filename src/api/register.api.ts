import BaseAPI from './index';
import HTTP from '../core/HTTP';

const registerAPIInstance = new HTTP('/auth');

export default class Register extends BaseAPI {
	data: UserData;

	super(data: UserData) {
		this.data = data;
	}

	async create() {
		const response = await registerAPIInstance.post('/signup', this.data);
		return response;
	}
}
