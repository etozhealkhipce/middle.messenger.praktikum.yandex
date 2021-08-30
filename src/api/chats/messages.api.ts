import BaseAPI from './index';

export default class Create extends BaseAPI {
	socket: WebSocket;

	async create(id: string) {
		const response = await this.chatsAPIInstance.post(`/token/${id}`);
		return JSON.parse(response).token;
	}

	async request(data: { userId: string; chatId: string; token: string }) {
		const { userId, chatId, token } = data;

		this.socket = new WebSocket(
			`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
		);

		this.socket.addEventListener('open', () => {
			console.log('Соединение установлено');
		});

		this.socket.addEventListener('close', (event) => {
			if (event.wasClean) {
				console.log('Соединение закрыто чисто');
			} else {
				console.log('Обрыв соединения');
			}

			console.log(`Код: ${event.code} | Причина: ${event.reason}`);
		});

		this.socket.addEventListener('error', (event) => {
			console.log('Ошибка', event.message);
		});
	}

	async update(message: string) {
		this.socket.send(
			JSON.stringify({
				content: message,
				type: 'message',
			})
		);
	}
}
