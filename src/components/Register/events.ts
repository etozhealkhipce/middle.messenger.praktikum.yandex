import authController from '../../controllers/auth.controller';
import Router from '../../core/Router/Router';

export default function (): void {
	const registerForm = <HTMLFormElement>document.getElementById('registerForm');
	const loginLink = <HTMLFormElement>(
		document.querySelector('.register-cart__link')
	);

	if (loginLink) {
		loginLink.addEventListener('click', () => {
			Router.go('/');
		});
	}

	if (registerForm) {
		registerForm.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			authController.signUp();
		});
	}
}
