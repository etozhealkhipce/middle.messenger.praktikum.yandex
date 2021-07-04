export default function (): void {
	const deleteButton = <HTMLButtonElement>document.getElementById("deleteBtn");
	const messageForm = <HTMLButtonElement>document.getElementById("messageForm");

	if (deleteButton) {
		deleteButton.addEventListener("click", (): void => {
			window.confirm("Удалить пользователя?");
		});
	}

	if (messageForm) {
		messageForm.addEventListener("submit", (e: Event): void => {
			e.preventDefault();

			const typedMessage = (<HTMLInputElement>(
				document.getElementById("messageInput")
			)).value;

			console.log({
				typedMessage,
			});
		});
	}
}
