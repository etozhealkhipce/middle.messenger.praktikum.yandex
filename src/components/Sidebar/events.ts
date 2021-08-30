import Router from '../../core/Router/Router';
import Store from '../../core/Store';
import userController from '../../controllers/user.controller';
import chatsController from '../../controllers/chats.controller';

export default function () {
	chatsController.getChats();

	const sidebar = <HTMLElement>document.querySelector('.sidebar');
	const profileButton = <HTMLButtonElement>(
		document.getElementById('profileBtn')
	);
	const search = <HTMLInputElement>document.getElementById('search');

	if (profileButton) {
		profileButton.addEventListener('click', (): void => {
			Router.go('/settings', { edit: false, changePassword: false });
		});
	}

	if (sidebar) {
		sidebar.addEventListener('click', (e: Event): void => {
			if ((<HTMLElement>e.target).closest('.user-preview')) {
				Router.go('/messenger', {
					addUserLink: true,
					notEmpty: true,
					chat: (<HTMLElement>e.target).closest('.user-preview')?.dataset?.chat,
				});
			}
		});
	}

	if (search) {
		search.addEventListener('input', async (e: Event): Promise<void> => {
			if (e.target.value) {
				const response = await userController.searchUser(e.target.value);

				if (response) {
					Store.set('sidebar-data', {
						users: response,
					});
				}
			} else {
				Store.set('sidebar-data', {
					users: null,
				});
			}
		});
	}
}
