export default function () {
	const registerButton = <HTMLButtonElement>(
		document.getElementById("registerBtn")
	);
	const loginForm = <HTMLButtonElement>document.getElementById("loginForm");

	registerButton.addEventListener("click", (): void => {
		window.location.href = "./register";
	});

	loginForm.addEventListener("submit", (e: Event): void => {
		e.preventDefault();

		const login = (<HTMLInputElement>document.getElementById("login")).value;
		const password = (<HTMLInputElement>document.getElementById("password"))
			.value;

		console.log({ login, password });
	});
}
