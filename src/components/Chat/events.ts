import Router from '../../core/Router/Router';

export default async function (): Promise<void> {
	const deleteButton = <HTMLButtonElement>document.getElementById('deleteBtn');
	const messageForm = <HTMLButtonElement>document.getElementById('messageForm');
	const toggle = <HTMLButtonElement>document.getElementById('toggle');
	const dropdown = <HTMLElement>document.querySelector('.header__dropdown');
	const createChat = <HTMLElement>document.querySelector('.create-link');
	const addUser = <HTMLElement>document.querySelector('.add-user-link');

	if (deleteButton) {
		deleteButton.addEventListener('click', (): void => {
			window.confirm('Удалить пользователя?');
		});
	}

	if (toggle && dropdown) {
		toggle.addEventListener('click', (): void => {
			dropdown.classList.toggle('hidden');
		});
	}

	if (createChat) {
		createChat.addEventListener('click', (): void => {
			Router.go('/messenger', {
				createChat: true,
				notEmpty: false,
				addUserLink: false,
				chatName: null,
			});
		});
	}

	if (addUser) {
		addUser.addEventListener('click', (): void => {
			Router.go('/messenger', {
				createChat: false,
				notEmpty: false,
				addUserLink: false,
				chatName: null,
				addUser: true,
			});
		});
	}

	if (messageForm) {
		messageForm.addEventListener('submit', (e: Event): void => {
			e.preventDefault();

			const typedMessage = (<HTMLInputElement>(
				document.getElementById('messageInput')
			)).value;

			console.log({
				typedMessage,
			});
		});
	}
}
