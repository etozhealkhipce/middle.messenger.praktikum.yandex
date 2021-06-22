export default function () {
	const registerForm = <HTMLFormElement>document.getElementById("registerForm");

	registerForm.addEventListener("submit", (e: Event): void => {
		e.preventDefault();

		const response = {
			email: (<HTMLInputElement>document.getElementById("email")).value,
			login: (<HTMLInputElement>document.getElementById("login")).value,
			name: (<HTMLInputElement>document.getElementById("name")).value,
			surname: (<HTMLInputElement>document.getElementById("surname")).value,
			phone: (<HTMLInputElement>document.getElementById("phone")).value,
			passwordRepeat: (<HTMLInputElement>(
				document.getElementById("password-repeat")
			)).value,
		};

		console.log(response);
	});
}
