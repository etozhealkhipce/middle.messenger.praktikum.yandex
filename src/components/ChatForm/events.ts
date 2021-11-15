import chatsController from '../../controllers/chats.controller';

export default async function (): Promise<void> {
	const createButton = <HTMLButtonElement>(
		document.getElementById('createButton')
	);
	const createInput = <HTMLInputElement>document.getElementById('createInput');

	if (createButton && createInput) {
		createButton.addEventListener('click', () => {
			chatsController.createChat(createInput.value);
		});
	}
}
