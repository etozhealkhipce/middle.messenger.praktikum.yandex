import {
	Test,
	validate,
	toggle,
	multipleListener,
} from "../../services/validate";

const path: string = window.location.pathname;

export default function (): void {
	const profileForm = <HTMLButtonElement>document.getElementById("profileForm");

	if (path === "/profile-edit") {
		// inputs
		const loginInput = <HTMLInputElement>document.getElementById("login");
		const emailInput = <HTMLInputElement>document.getElementById("email");
		const phoneInput = <HTMLInputElement>document.getElementById("phone");

		// errors
		const emailError = <HTMLParagraphElement>(
			document.querySelector(".email-error")
		);
		const phoneError = <HTMLParagraphElement>(
			document.querySelector(".phone-error")
		);

		const loginError = <HTMLParagraphElement>(
			document.querySelector(".login-error")
		);

		// tests
		const loginTest = () =>
			toggle(!validate(loginInput.value, Test.login), loginError);
		multipleListener(loginInput, "blur, focus", loginTest);
		const emailTest = () =>
			toggle(!validate(emailInput.value, Test.email), emailError);
		multipleListener(emailInput, "blur, focus", emailTest);

		const phoneTest = () =>
			toggle(!validate(phoneInput.value, Test.phone), phoneError);
		multipleListener(phoneInput, "blur, focus", phoneTest);
		// form
		profileForm.addEventListener("submit", (e: Event): void => {
			e.preventDefault();

			const obj = {
				login: <HTMLInputElement>document.getElementById("login"),
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

			const loginValidate = loginTest();
			const emailValidate = emailTest();
			const phoneValidate = phoneTest();

			if (loginValidate && emailValidate && phoneValidate) {
				console.log(request);
			}
		});
	}

	if (path === "/profile-change-password") {
		// inputs
		const passwordInput = <HTMLInputElement>document.getElementById("password");
		const passwordNewInput = <HTMLInputElement>(
			document.getElementById("password-new")
		);
		const passwordNewRepeatInput = <HTMLInputElement>(
			document.getElementById("password-new-repeat")
		);
		// errors
		const passwordError = <HTMLParagraphElement>(
			document.querySelector(".password-error")
		);
		const passwordNewError = <HTMLParagraphElement>(
			document.querySelector(".password-new")
		);
		const passwordNewRepeatError = <HTMLParagraphElement>(
			document.querySelector(".password-new-repeat-error")
		);
		// tests
		const passwordTest = () =>
			toggle(!validate(passwordInput.value, Test.password), passwordError);
		multipleListener(passwordInput, "blur, focus", passwordTest);

		const passwordNewTest = () =>
			toggle(
				!validate(passwordNewInput.value, Test.password),
				passwordNewError
			);
		multipleListener(passwordNewInput, "blur, focus", passwordNewTest);

		const passwordNew = () =>
			toggle(
				!validate(passwordNewInput.value, Test.password),
				passwordNewError
			);
		multipleListener(passwordNewInput, "blur, focus", passwordNew);

		const passwordNewRepeatTest = () =>
			toggle(
				passwordNewRepeatInput.value !== passwordNewInput.value,
				passwordNewRepeatError
			);
		multipleListener(
			passwordNewRepeatInput,
			"blur, focus",
			passwordNewRepeatTest
		);
		// form
		profileForm.addEventListener("submit", (e: Event): void => {
			e.preventDefault();

			const obj = {
				password: <HTMLInputElement>document.getElementById("password"),
				passwordNew: <HTMLInputElement>document.getElementById("password-new"),
				passwordNewRepeat: <HTMLInputElement>(
					document.getElementById("password-new-repeat")
				),
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

			const passwordValidate = passwordTest();
			const passwordNewValidate = passwordNewTest();
			const passwordNewRepeatValidate = passwordNewRepeatTest();

			if (
				passwordValidate &&
				passwordNewValidate &&
				passwordNewRepeatValidate
			) {
				console.log(request);
			}
		});
	}
}
