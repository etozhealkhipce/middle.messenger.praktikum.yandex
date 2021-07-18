import AuthController from '../../controllers/auth.controller';
import {
	Test,
	validate,
	toggle,
	multipleListener,
} from '../../services/validate';

export default function (): void {
	const registerForm = <HTMLFormElement>document.getElementById('registerForm');

	const loginInput = <HTMLInputElement>document.getElementById('login');
	const passwordInput = <HTMLInputElement>document.getElementById('password');
	const passwordRepeatInput = <HTMLInputElement>(
		document.getElementById('password-repeat')
	);
	const emailInput = <HTMLInputElement>document.getElementById('email');
	const phoneInput = <HTMLInputElement>document.getElementById('phone');

	const loginError = <HTMLParagraphElement>(
		document.querySelector('.login-error')
	);
	const passwordError = <HTMLParagraphElement>(
		document.querySelector('.password-error')
	);
	const passwordRepeatError = <HTMLParagraphElement>(
		document.querySelector('.password-repeat-error')
	);
	const emailError = <HTMLParagraphElement>(
		document.querySelector('.email-error')
	);
	const phoneError = <HTMLParagraphElement>(
		document.querySelector('.phone-error')
	);

	const loginTest = () =>
		toggle(!validate(loginInput.value, Test.login), loginError);
	multipleListener(loginInput, 'blur, focus', loginTest);

	const passwordTest = () =>
		toggle(!validate(passwordInput.value, Test.password), passwordError);
	multipleListener(passwordInput, 'blur, focus', passwordTest);

	const passwordRepeatTest = () =>
		toggle(
			passwordRepeatInput.value !== passwordInput.value,
			passwordRepeatError
		);
	multipleListener(passwordRepeatInput, 'blur, focus', passwordRepeatTest);

	const emailTest = () =>
		toggle(!validate(emailInput.value, Test.email), emailError);
	multipleListener(emailInput, 'blur, focus', emailTest);

	const phoneTest = () =>
		toggle(!validate(phoneInput.value, Test.phone), phoneError);
	multipleListener(phoneInput, 'blur, focus', phoneTest);

	if (registerForm) {
		registerForm.addEventListener('submit', (e: Event): void => {
			e.preventDefault();

			const response = {
				email: (<HTMLInputElement>document.getElementById('email')).value,
				login: (<HTMLInputElement>document.getElementById('login')).value,
				first_name: (<HTMLInputElement>document.getElementById('name')).value,
				second_name: (<HTMLInputElement>document.getElementById('surname'))
					.value,
				phone: (<HTMLInputElement>document.getElementById('phone')).value,
				password: (<HTMLInputElement>document.getElementById('password-repeat'))
					.value,
			};

			const passwordValidate = passwordTest();
			const loginValidate = loginTest();
			const passwordRepeatvalidate = passwordRepeatTest();
			const emailValidate = emailTest();
			const phoneValidate = phoneTest();

			if (
				passwordValidate &&
				loginValidate &&
				passwordRepeatvalidate &&
				emailValidate &&
				phoneValidate
			) {
				const auth = new AuthController();
				auth.start().signUp(response);
			}
		});
	}
}
