const sidebar = document.querySelector(".sidebar");
const profileButton = document.getElementById("profileBtn");

profileButton.addEventListener("click", (): void => {
	window.location = "./profile.html";
});

sidebar.addEventListener("click", (e: Event): void => {
	if (e.target.closest(".user-preview")) {
		document.location.href = "./chat.html";
	}
});
