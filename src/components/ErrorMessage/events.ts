export default function () {
	const backButton = <HTMLButtonElement>document.getElementById("backButton");

	if (backButton) {
		backButton.addEventListener("click", (): void => {
			window.history.back();
		});
	}
}
