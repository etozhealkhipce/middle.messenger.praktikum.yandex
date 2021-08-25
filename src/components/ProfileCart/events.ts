import authController from '../../controllers/auth.controller';
import Router from '../../core/Router/Router';

import { Test, validate, toggle, multipleListener } from '../../utils/validate';

export default function (): void {
	authController.user();

	const profileForm = <HTMLButtonElement>document.getElementById('profileForm');
	const profileEditLink = <HTMLButtonElement>(
		document.querySelector('.profile-edit')
	);
	const profileChangePasswordLink = <HTMLButtonElement>(
		document.querySelector('.profile-change-password')
	);
	const profileBackLink = <HTMLButtonElement>document.querySelector('.back');
	const logoutLink = <HTMLElement>document.querySelector('.logout');
	const saveBtn = <HTMLElement>document.getElementById('saveBtn');

	if (saveBtn) {
		saveBtn.addEventListener('click', () => {
			
		});
	}

	if (logoutLink) {
		logoutLink.addEventListener('click', () => {
			authController.logout();
			Router.go('/');
		});
	}

	if (profileEditLink) {
		profileEditLink.addEventListener('click', () => {
			Router.go('/profile', {
				profileCart: {
					props: {
						edit: true,
						changePassword: false,
					},
				},
			});
		});
	}

	if (profileChangePasswordLink) {
		profileChangePasswordLink.addEventListener('click', () => {
			Router.go('/profile', {
				profileCart: {
					props: {
						edit: false,
						changePassword: true,
					},
				},
			});
		});
	}

	if (profileBackLink) {
		profileBackLink.addEventListener('click', () => {
			Router.go('/profile', {
				profileCart: {
					props: {
						edit: false,
						changePassword: false,
					},
				},
			});
		});
	}

	// inputs
	const loginInput = <HTMLInputElement>document.getElementById('login');
	const emailInput = <HTMLInputElement>document.getElementById('email');
	const phoneInput = <HTMLInputElement>document.getElementById('phone');

	// errors
	const emailError = <HTMLParagraphElement>(
		document.querySelector('.email-error')
	);
	const phoneError = <HTMLParagraphElement>(
		document.querySelector('.phone-error')
	);

	const loginError = <HTMLParagraphElement>(
		document.querySelector('.login-error')
	);

	// tests
	const loginTest = () => {
		if (loginInput && loginError) {
			return toggle(!validate(loginInput.value, Test.login), loginError);
		}

		return false;
	};
	multipleListener(loginInput, 'blur, focus', loginTest);

	const emailTest = () => {
		if (emailInput && emailError) {
			return toggle(!validate(emailInput.value, Test.email), emailError);
		}

		return false;
	};
	multipleListener(emailInput, 'blur, focus', emailTest);

	const phoneTest = () => {
		if (phoneInput && phoneError) {
			return toggle(!validate(phoneInput.value, Test.phone), phoneError);
		}

		return false;
	};
	multipleListener(phoneInput, 'blur, focus', phoneTest);

	// inputs
	const passwordInput = <HTMLInputElement>document.getElementById('password');
	const passwordNewInput = <HTMLInputElement>(
		document.getElementById('password-new')
	);
	const passwordNewRepeatInput = <HTMLInputElement>(
		document.getElementById('password-new-repeat')
	);
	// errors
	const passwordError = <HTMLParagraphElement>(
		document.querySelector('.password-error')
	);
	const passwordNewError = <HTMLParagraphElement>(
		document.querySelector('.password-new-error')
	);
	const passwordNewRepeatError = <HTMLParagraphElement>(
		document.querySelector('.password-new-repeat-error')
	);
	// tests
	const passwordTest = () => {
		if (passwordInput && passwordError) {
			return toggle(
				!validate(passwordInput.value, Test.password),
				passwordError
			);
		}

		return false;
	};
	multipleListener(passwordInput, 'blur, focus', passwordTest);

	const passwordNewTest = () => {
		if (passwordNewInput && passwordNewError) {
			return toggle(
				!validate(passwordNewInput.value, Test.password),
				passwordNewError
			);
		}

		return false;
	};
	multipleListener(passwordNewInput, 'blur, focus', passwordNewTest);

	const passwordNewRepeatTest = () => {
		if (passwordNewRepeatInput && passwordNewRepeatError) {
			return toggle(
				passwordNewRepeatInput.value !== passwordNewInput.value,
				passwordNewRepeatError
			);
		}

		return false;
	};
	multipleListener(
		passwordNewRepeatInput,
		'blur, focus',
		passwordNewRepeatTest
	);

	// form
	if (profileForm) {
		profileForm.addEventListener('submit', (e: Event): void => {
			e.preventDefault();

			const obj = {
				password: <HTMLInputElement>document.getElementById('password'),
				passwordNew: <HTMLInputElement>document.getElementById('password-new'),
				passwordNewRepeat: <HTMLInputElement>(
					document.getElementById('password-new-repeat')
				),
				login: <HTMLInputElement>document.getElementById('login'),
				avatar: <HTMLInputElement>document.getElementById('avatar'),
				email: <HTMLInputElement>document.getElementById('email'),
				phone: <HTMLInputElement>document.getElementById('phone'),
				name: <HTMLInputElement>document.getElementById('name'),
				surname: <HTMLInputElement>document.getElementById('surname'),
			};

			const request = Object.entries(obj).reduce(
				(acc: Record<string, any>, [key, elem]): Record<string, string> => {
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

			const loginValidate = loginTest();
			const emailValidate = emailTest();
			const phoneValidate = phoneTest();

			if (
				(loginValidate && emailValidate && phoneValidate) ||
				(passwordValidate && passwordNewValidate && passwordNewRepeatValidate)
			) {
				console.log(request);
			}
		});
	}
}
