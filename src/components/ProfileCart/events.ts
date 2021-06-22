export default function () {
	const profileForm = <HTMLButtonElement>document.getElementById("profileForm");

	profileForm.addEventListener("submit", (e: Event): void => {
		e.preventDefault();

		const obj = {
			login: <HTMLInputElement>document.getElementById("login"),
			password: <HTMLInputElement>document.getElementById("password"),
			passwordNew: <HTMLInputElement>document.getElementById("password-new"),
			passwordNewRepeat: <HTMLInputElement>(
				document.getElementById("password-new-repeat")
			),
			avatar: <HTMLInputElement>document.getElementById("avatar"),
			email: <HTMLInputElement>document.getElementById("email"),
			phone: <HTMLInputElement>document.getElementById("phone"),
			name: <HTMLInputElement>document.getElementById("name"),
			surname: <HTMLInputElement>document.getElementById("surname"),
		};

		const request = Object.entries(obj).reduce(
			(acc, [key, elem]): Record<string, string> => {
				if (elem && elem.value) {
					acc[key] = elem.value;
				}

				return acc;
			},
			{}
		);

		console.log(request);
	});
}
