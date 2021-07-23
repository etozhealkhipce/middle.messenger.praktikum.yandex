import authController from '../../controllers/auth.controller';
import Router from '../../core/Router/Router';

import {
	Test,
	validate,
	toggle,
	multipleListener,
} from '../../services/validate';

export default function (): void {
	const registerButton = <HTMLButtonElement>(
		document.getElementById('registerBtn')
	);

	const loginForm = <HTMLButtonElement>document.getElementById('loginForm');
	const loginInput = <HTMLInputElement>document.getElementById('login');
	const passwordInput = <HTMLInputElement>document.getElementById('password');
	const forgetPassword = <HTMLInputElement>(
		document.querySelector('.login-cart__link')
	);
	const loginError = <HTMLParagraphElement>(
		document.querySelector('.login-error')
	);
	const passwordError = <HTMLParagraphElement>(
		document.querySelector('.password-error')
	);

	if (registerButton) {
		registerButton.addEventListener('click', (): void => {
			Router.go('/register');
		});
	}

	if (forgetPassword) {
		forgetPassword.addEventListener('click', (): void => {
			Router.go('/inactivechat');
		});
	}

	const loginTest = () =>
		toggle(!validate(loginInput.value, Test.login), loginError);
	multipleListener(loginInput, 'blur, focus', loginTest);

	const passwordTest = () =>
		toggle(!validate(passwordInput.value, Test.password), passwordError);
	multipleListener(passwordInput, 'blur, focus', passwordTest);

	if (loginForm) {
		loginForm.addEventListener('submit', (e: Event): void => {
			e.preventDefault();

			authController.logout();

			const passwordValidate = passwordTest();
			const loginValidate = loginTest();

			if (passwordValidate && loginValidate) {
				console.log({ login: loginInput.value, password: passwordInput.value });
			}
		});
	}
}
