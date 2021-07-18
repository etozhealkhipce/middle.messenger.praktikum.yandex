import ChatsAPI from '../api/chats.api';

const chatsAPI = new ChatsAPI();

export default class ChatsController {
	start() {
		return this;
	}

	public async getChats() {
		console.log('test');
		const chats = await chatsAPI.request();
		console.log(chats);
	}
}
