import { authController } from '../../index';

export default function (): void {
	const registerForm = <HTMLFormElement>document.getElementById('registerForm');

	if (registerForm) {
		registerForm.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			authController.signUp();
		});
	}
}
