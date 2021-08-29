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
					chatName: (<HTMLElement>e.target)
						?.closest('.user-preview')
						?.querySelector('.user-preview__title')?.textContent,
				});
			}
		});
	}

	if (search) {
		search.addEventListener('input', (e: Event): void => {
			if (e.target.value) {
				userController.searchUser(e.target.value);
			} else {
				Store.set('sidebar-data', {
					users: null,
				});
			}
		});
	}
}
