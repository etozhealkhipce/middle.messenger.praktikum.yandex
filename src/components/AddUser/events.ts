import chatsController from '../../controllers/chats.controller';
import userController from '../../controllers/user.controller';
import Store from '../../core/Store';

export default async function (): Promise<void> {
	const addButton = <HTMLButtonElement>document.getElementById('addButton');
	const addInput = <HTMLInputElement>document.getElementById('addInput');
	const chatId = (<HTMLInputElement>document.querySelector('.add'))?.dataset
		?.id;

	if (addButton) {
		addButton.addEventListener('click', (): void => {
			const body = {
				users: Store.get('added-user').users.map(
					(u: Record<string, any>) => u.id
				),
				chatId,
			};

			chatsController.addUsers(body);
		});
	}

	if (addInput) {
		addInput.addEventListener('input', async (e: Event): Promise<void> => {
			const target = e.target as HTMLInputElement;

			if (target) {
				const response = await userController.searchUser(target.value);

				if (response) {
					Store.set('add-user', {
						users: response,
					});
				}
			} else {
				Store.set('add-user', {
					users: null,
				});
			}
		});
	}
}
