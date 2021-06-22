export default function () {
	const sidebar = <HTMLButtonElement>document.querySelector(".sidebar");
	const profileButton = <HTMLButtonElement>(
		document.getElementById("profileBtn")
	);

	profileButton.addEventListener("click", (): void => {
		window.location.href = "./profile";
	});

	sidebar.addEventListener("click", (e: Event): void => {
		if ((<HTMLElement>e.target).closest(".user-preview")) {
			document.location.href = "./activechat";
		}
	});
}
