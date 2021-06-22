export default function () {
	const deleteButton = document.getElementById("deleteBtn");
	const messageForm = document.getElementById("messageForm");
	const profileButton = document.getElementById("profileBtn");

	profileButton.addEventListener("click", () => {
		window.location = "./profile";
	});

	deleteButton.addEventListener("click", () => {
		window.confirm("Удалить пользователя?");
	});

	messageForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const typedMessage = document.getElementById("messageInput").value;
		console.log({
			typedMessage,
		});
	});
}
