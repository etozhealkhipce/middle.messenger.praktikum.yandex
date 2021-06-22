export default function (): void {
	const deleteButton = <HTMLButtonElement>document.getElementById("deleteBtn");
	const messageForm = <HTMLButtonElement>document.getElementById("messageForm");
	const profileButton = <HTMLButtonElement>(
		document.getElementById("profileBtn")
	);

	profileButton.addEventListener("click", (): void => {
		window.location.href = "./profile";
	});

	deleteButton.addEventListener("click", (): void => {
		window.confirm("Удалить пользователя?");
	});

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
