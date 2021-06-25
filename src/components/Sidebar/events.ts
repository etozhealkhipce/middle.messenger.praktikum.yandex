export default function () {
	const sidebar = <HTMLButtonElement>document.querySelector(".sidebar");
	const profileButton = <HTMLButtonElement>(
		document.getElementById("profileBtn")
	);
	if (profileButton) {
		profileButton.addEventListener("click", (): void => {
			window.location.href = "./profile";
		});
	}
	if (sidebar) {
		sidebar.addEventListener("click", (e: Event): void => {
			if ((<HTMLElement>e.target).closest(".user-preview")) {
				document.location.href = "./activechat";
			}
		});
	}
}
