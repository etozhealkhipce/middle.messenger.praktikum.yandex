import chatsController from '../../controllers/chats.controller';
import Store from '../../core/Store';

export default async function (): Promise<void> {
	const removeButton = <HTMLButtonElement>(
		document.getElementById('removeButton')
	);
	const chatId: string = document.querySelector('.remove')?.dataset?.id;

	if (chatId) chatsController.getChatUsers(chatId);

	if (removeButton) {
		removeButton.addEventListener('click', (): Promise<void> => {
			const body = {
				users: Store.get('remove-users').users.map((u) => u.id),
				chatId,
			};

			chatsController.removeUsers(body);
		});
	}
}
