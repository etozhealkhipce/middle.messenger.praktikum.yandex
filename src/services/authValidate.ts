import { Test, validate, toggle, multipleListener } from '../utils/validate';

export function registerValidate(): Boolean | RegisterUserData {
	// TODO: переписать валидацию (вынести флаги в store или template)
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

	const passwordValidated = passwordTest();
	const loginValidated = loginTest();
	const passwordRepeatvalidated = passwordRepeatTest();
	const emailValidated = emailTest();
	const phoneValidated = phoneTest();

	if (
		passwordValidated &&
		loginValidated &&
		passwordRepeatvalidated &&
		emailValidated &&
		phoneValidated
	) {
		return {
			email: emailInput.value,
			login: loginInput.value,
			first_name: (<HTMLInputElement>document.getElementById('name')).value,
			second_name: (<HTMLInputElement>document.getElementById('surname')).value,
			phone: phoneInput.value,
			password: passwordRepeatInput.value,
		};
	}

	return false;
}

export function loginValidate(): Boolean | LoginUserData {
	const loginInput = <HTMLInputElement>document.getElementById('login');
	const passwordInput = <HTMLInputElement>document.getElementById('password');

	const loginError = <HTMLParagraphElement>(
		document.querySelector('.login-error')
	);
	const passwordError = <HTMLParagraphElement>(
		document.querySelector('.password-error')
	);

	const loginTest = () =>
		toggle(!validate(loginInput.value, Test.login), loginError);
	multipleListener(loginInput, 'blur, focus', loginTest);

	const passwordTest = () =>
		toggle(!validate(passwordInput.value, Test.password), passwordError);
	multipleListener(passwordInput, 'blur, focus', passwordTest);

	const passwordValidated = passwordTest();
	const loginValidated = loginTest();

	if (loginValidated && passwordValidated) {
		return {
			login: loginInput.value,
			password: passwordInput.value,
		};
	}

	return false;
}
