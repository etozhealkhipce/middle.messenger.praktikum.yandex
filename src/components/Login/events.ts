import authController from '../../controllers/auth.controller';
import userController from '../../controllers/user.controller';
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
		loginForm.addEventListener('submit', async (e: Event): Promise<void> => {
			e.preventDefault();
			await authController.signIn();
			await userController.getUserinfo();
		});
	}

	if (registerButton) {
		registerButton.addEventListener('click', (): void => {
			Router.go('/sign-up');
		});
	}

	if (forgetPassword) {
		forgetPassword.addEventListener('click', (): void => {
			Router.go('/messenger', { notEmpty: false });
		});
	}
}
