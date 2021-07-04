import { router } from "../../index";

export default function () {
	const sidebar = <HTMLElement>document.querySelector(".sidebar");
	const profileButton = <HTMLButtonElement>(
		document.getElementById("profileBtn")
	);

	if (profileButton) {
		profileButton.addEventListener("click", (): void => {
			router.go("/profile", { edit: false, changePassword: false });
		});
	}

	if (sidebar) {
		sidebar.addEventListener("click", (e: Event): void => {
			if ((<HTMLElement>e.target).closest(".user-preview")) {
				router.go("/activechat");
			}
		});
	}
}
