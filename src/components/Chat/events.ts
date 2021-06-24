export default function (): void {
	const deleteButton = <HTMLButtonElement>document.getElementById("deleteBtn");
	const messageForm = <HTMLButtonElement>document.getElementById("messageForm");
	const profileButton = <HTMLButtonElement>(
		document.getElementById("profileBtn")
	);

	if (profileButton) {
		profileButton.addEventListener("click", (): void => {
			window.location.href = "./profile";
		});
	}

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
