import ChatsAPI from '../api/chats/chats.api';
import UsersAPI from '../api/chats/users.api';
import AuthorityAPI from '../api/auth/authority.api';
import UserAPI from '../api/user/user.api';
import MessagesAPI from '../api/chats/messages.api';

import Store from '../core/Store';
import Router from '../core/Router/Router';

const chatsAPI = new ChatsAPI();
const usersAPI = new UsersAPI();
const userAPI = new UserAPI();
const authorityAPI = new AuthorityAPI();
const messagesAPI = new MessagesAPI();

class ChatsController {
	messagesCounter: 0;

	private async getUsers(data: Record<string, any>[]) {
		const promises = data.map((item: Record<string, any>) =>
			userAPI.request(item.user_id)
		);

		const users: unknown = await Promise.all(promises);

		if (Array.isArray(users)) {
			return data.map((item: Record<string, any>, index) => ({
				...item,
				user: users[index],
			}));
		}

		return [];
	}

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

	public async connectToChat(chatId: string) {
		try {
			const token = await messagesAPI.create(chatId);
			const user = await authorityAPI.request();

			messagesAPI.request({ userId: user.id, chatId, token });

			messagesAPI.socket.addEventListener('message', async (event) => {
				if (event.type === 'error') return;

				const authority: string = localStorage.getItem('authority') || '{}';
				// eslint-disable-next-line @typescript-eslint/naming-convention
				const { id, first_name } = JSON.parse(authority);
				const data = JSON.parse(event.data);

				if (Array.isArray(data)) {
					const messages: Record<string, any>[] = await this.getUsers(data);

					const result = messages.map((item: Record<string, any>) => {
						if (item.user_id !== id) {
							return {
								...item,
								time: new Date(item.time).toLocaleString('ru-RU').slice(12),
								self: false,
								name: item.user.first_name,
							};
						}
						return {
							...item,
							time: new Date(item.time).toLocaleString('ru-RU').slice(12),
							self: true,
							name: first_name,
						};
					});

					Store.set('chat-data', {
						messages: result,
					});
				} else {
					const messages = Array.isArray(Store.get('chat-data')?.messages)
						? Store.get('chat-data').messages
						: [];

					Store.set('chat-data', {
						messages: [...messages, data],
					});
				}

				this.messagesCounter += 20;
			});
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
