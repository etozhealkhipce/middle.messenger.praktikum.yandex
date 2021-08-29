import CreateChatAPI from '../api/chats/create.api';
import ActiveChatsAPI from '../api/chats/active.api';

import Store from '../core/Store';
import Router from '../core/Router/Router';
// import {
// 	editUserValidate,
// 	editPasswordValidate,
// } from '../services/userValidate';

const createChatAPI = new CreateChatAPI();
const activeChatsAPI = new ActiveChatsAPI();

class ChatsController {
	public async createChat(title: string) {
		try {
			await createChatAPI.create(title);
		} catch (error) {
			console.log(error);
		} finally {
			Router.go('/messenger', {
				createChat: false,
			});
		}
	}

	public async getChats() {
		try {
			const response = await activeChatsAPI.request();

			if (response) {
				Store.set('sidebar-data', {
					chats: JSON.parse(response),
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
}

export default new ChatsController();
