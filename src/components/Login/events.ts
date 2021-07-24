import authController from '../../controllers/auth.controller';
import Router from '../../core/Router/Router';

export default function (): void {
	const loginForm = <HTMLButtonElement>document.getElementById('loginForm');
	const forgetPassword = <HTMLInputElement>(
		document.querySelector('.login-cart__link')
	);
	const registerButton = <HTMLButtonElement>(
		document.getElementById('registerBtn')
	);

	if (loginForm) {
		loginForm.addEventListener('submit', (e: Event): void => {
			e.preventDefault();
			authController.signIn();
		});
	}

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
}
