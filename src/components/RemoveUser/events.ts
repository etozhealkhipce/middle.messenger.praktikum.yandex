import chatsController from '../../controllers/chats.controller';
import Store from '../../core/Store';

export default async function (): Promise<void> {
	const removeButton = <HTMLButtonElement>(
		document.getElementById('removeButton')
	);
	const chatId: string | undefined = (<HTMLElement>(
		document.querySelector('.remove')
	))?.dataset?.id;

	if (chatId) chatsController.getChatUsers(chatId);

	if (removeButton) {
		removeButton.addEventListener('click', (): void => {
			const body = {
				users: Store.get('remove-users').users.map(
					(u: Record<string, any>) => u.id
				),
				chatId,
			};

			chatsController.removeUsers(body);
		});
	}
}
