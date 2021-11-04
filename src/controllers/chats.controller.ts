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
			const user = await authorityAPI.request();

			messagesAPI.request({ userId: user.id, chatId: id, token });

			messagesAPI.socket.addEventListener('message', async (event) => {
				if (event.type === 'error') return;

				// eslint-disable-next-line @typescript-eslint/naming-convention
				const { id, first_name } = JSON.parse(
					localStorage.getItem('authority')
				);
				const data = JSON.parse(event.data);

				if (Array.isArray(data)) {
					const messages: Array = [];

					const getUsers = async () => {
						for (const item of data) {
							const user = await userAPI.request(item.user_id);
							messages.push({ ...item, user });
						}
					};

					await getUsers();

					const result = messages.map((item: Record<string, any>) => {
						if (item.user_id !== id) {
							console.log(user);

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
						users: [...messages, data],
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
