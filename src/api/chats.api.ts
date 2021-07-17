import BaseAPI from './index';
import HTTP from '../core/HTTP';

const chatAPIInstance = new HTTP('api/v1/chats');

export default class ChatAPI extends BaseAPI {
	create() {
		return chatAPIInstance.post('/', { title: 'string' });
	}

	request() {
		return chatAPIInstance.get('/full');
	}
}
