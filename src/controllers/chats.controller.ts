import ChatsAPI from '../api/chats/chats.api';
import UsersAPI from '../api/chats/users.api';
import UserAPI from '../api/auth/user.api';
import MessagesAPI from '../api/chats/messages.api';

import Store from '../core/Store';
import Router from '../core/Router/Router';

const chatsAPI = new ChatsAPI();
const usersAPI = new UsersAPI();
const userAPI = new UserAPI();
const messagesAPI = new MessagesAPI();

class ChatsController {
	public async createChat(title: string) {
		try {
			await chatsAPI.create(title);
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
			const response = await chatsAPI.request();

			if (response) {
				Store.set('sidebar-data', {
					chats: response,
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	public async getChatUsers(id: string) {
		try {
			const response = await usersAPI.request(id);

			if (response) {
				Store.set('current-users', {
					users: response,
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	public async addUsers(body: Record<string, any>) {
		try {
			await usersAPI.update(body);
		} catch (error) {
			console.log(error);
		} finally {
			Router.go('/messenger', {
				createChat: false,
				notEmpty: false,
				addUserLink: true,
				chat: null,
				addUser: false,
			});
		}
	}

	public async removeUsers(body: Record<string, any>) {
		try {
			await usersAPI.delete(body);
		} catch (error) {
			console.log(error);
		} finally {
			Router.go('/messenger', {
				createChat: false,
				notEmpty: false,
				addUserLink: true,
				chat: null,
				addUser: false,
			});
		}
	}

	public async removeChat(id: string) {
		try {
			await chatsAPI.delete(id);
		} catch (error) {
			console.log(error);
		} finally {
			Router.go('/messenger', {
				createChat: false,
				notEmpty: false,
				addUserLink: true,
				chat: null,
				addUser: false,
			});
		}
	}

	public async connectToChat(id: string) {
		try {
			const token = await messagesAPI.create(id);
			const user = await userAPI.request();

			messagesAPI.request({ userId: user.id, chatId: id, token });
		} catch (error) {
			console.log(error);
		}
	}

	public async sendMessage(message: string) {
		try {
			messagesAPI.update(message);
		} catch (error) {
			console.log(error);
		}
	}
}

export default new ChatsController();
