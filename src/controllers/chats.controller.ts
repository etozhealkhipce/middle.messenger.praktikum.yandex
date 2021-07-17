import ChatsAPI from '../api/chats.api';

const chatsAPI = new ChatsAPI();

class ChatsController {
	public async getChats() {
		console.log('test');
		const chats = await chatsAPI.request();
		console.log(chats);
	}
}

export default new ChatsController();
