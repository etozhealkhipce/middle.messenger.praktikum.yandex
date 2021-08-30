import Router from '../../core/Router/Router';
import chatsController from '../../controllers/chats.controller';

export default async function (): Promise<void> {
	const messageForm = <HTMLButtonElement>document.getElementById('messageForm');
	const toggle = <HTMLButtonElement>document.getElementById('toggle');
	const dropdown = <HTMLElement>document.querySelector('.header__dropdown');
	const createChat = <HTMLElement>document.querySelector('.create-link');
	const removeChat = <HTMLElement>document.querySelector('.remove-link');
	const addUser = <HTMLElement>document.querySelector('.add-user-link');
	const header = <HTMLElement>document.getElementById('header');
	const chatId: string = header?.dataset?.id;

	if (header && chatId) {
		chatsController.connectToChat(chatId);
	}

	if (header && chatId) {
		header.addEventListener('click', () => {
			Router.go('/messenger', {
				createChat: false,
				notEmpty: false,
				addUserLink: false,
				addUser: false,
				removeUser: true,
			});
		});
	}

	if (toggle && dropdown) {
		toggle.addEventListener('click', (e: Event): void => {
			e.stopImmediatePropagation();

			dropdown.classList.toggle('hidden');
		});
	}

	if (createChat) {
		createChat.addEventListener('click', (e: Event): void => {
			e.stopImmediatePropagation();

			Router.go('/messenger', {
				createChat: true,
				notEmpty: false,
				addUserLink: false,
				addUser: false,
				removeUser: false,
				chat: null,
			});
		});
	}

	if (removeChat) {
		removeChat.addEventListener('click', (e: Event): void => {
			e.stopImmediatePropagation();

			if (window.confirm('Удалить чат?')) {
				chatsController.removeChat(chatId);
			}
		});
	}

	if (addUser) {
		addUser.addEventListener('click', (e: Event): void => {
			e.stopImmediatePropagation();

			Router.go('/messenger', {
				createChat: false,
				notEmpty: false,
				addUserLink: false,
				removeUser: false,
				addUser: true,
			});
		});
	}

	if (messageForm) {
		messageForm.addEventListener('submit', (e: Event): void => {
			e.preventDefault();

			chatsController.sendMessage(
				(<HTMLInputElement>document.getElementById('messageInput')).value
			);

			(<HTMLInputElement>document.getElementById('messageInput')).value = '';
		});
	}
}
