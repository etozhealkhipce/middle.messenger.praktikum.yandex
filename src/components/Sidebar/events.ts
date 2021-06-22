export default function () {
	const sidebar = document.querySelector(".sidebar");
	const profileButton = document.getElementById("profileBtn");
	console.log(profileButton);

	profileButton.addEventListener("click", (): void => {
		window.location = "./profile";
	});

	sidebar.addEventListener("click", (e: Event): void => {
		if (e.target.closest(".user-preview")) {
			document.location.href = "./activechat";
		}
	});
}
