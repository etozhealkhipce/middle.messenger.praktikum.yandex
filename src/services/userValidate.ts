import { Test, validate, toggle, multipleListener } from '../utils/validate';

export function editUserValidate(): Boolean | UpdateUserData {
	// TODO: переписать валидацию (вынести флаги в store или template)
	const loginInput = <HTMLInputElement>document.getElementById('login');
	const emailInput = <HTMLInputElement>document.getElementById('email');
	const phoneInput = <HTMLInputElement>document.getElementById('phone');
	const nameInput = <HTMLInputElement>document.getElementById('name');
	const surnameInput = <HTMLInputElement>document.getElementById('surname');

	const loginError = <HTMLParagraphElement>(
		document.querySelector('.login-error')
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

	const emailTest = () =>
		toggle(!validate(emailInput.value, Test.email), emailError);
	multipleListener(emailInput, 'blur, focus', emailTest);

	const phoneTest = () =>
		toggle(!validate(phoneInput.value, Test.phone), phoneError);
	multipleListener(phoneInput, 'blur, focus', phoneTest);

	const loginValidated = loginTest();
	const emailValidated = emailTest();
	const phoneValidated = phoneTest();

	if (loginValidated && emailValidated && phoneValidated) {
		return {
			email: emailInput.value,
			login: loginInput.value,
			first_name: nameInput.value,
			second_name: surnameInput.value,
			phone: phoneInput.value,
			display_name: '',
		};
	}

	return false;
}

export function editPasswordValidate(): Boolean | UpdateUserPassword {
	const passwordInput = <HTMLInputElement>document.getElementById('password');
	const passwordNewInput = <HTMLInputElement>(
		document.getElementById('password-new')
	);
	const passwordNewRepeatInput = <HTMLInputElement>(
		document.getElementById('password-new-repeat')
	);

	const passwordError = <HTMLParagraphElement>(
		document.querySelector('.password-error')
	);
	const passwordNewInputError = <HTMLParagraphElement>(
		document.querySelector('.password-new-error')
	);
	const passwordNewRepeatInputError = <HTMLParagraphElement>(
		document.querySelector('.password-new-repeat-error')
	);

	const passwordTest = () =>
		toggle(!validate(passwordInput.value, Test.password), passwordError);
	multipleListener(passwordInput, 'blur, focus', passwordTest);

	const passwordNewTest = () =>
		toggle(
			!validate(passwordNewInput.value, Test.password),
			passwordNewInputError
		);
	multipleListener(passwordNewInput, 'blur, focus', passwordNewTest);

	const passwordNewRepeatTest = () =>
		toggle(
			passwordNewRepeatInput.value !== passwordNewInput.value,
			passwordNewRepeatInputError
		);
	multipleListener(
		passwordNewRepeatInput,
		'blur, focus',
		passwordNewRepeatTest
	);

	const passwordValidated = passwordTest();
	const passwordNewValidated = passwordNewTest();
	const passwordNewRepeatValidated = passwordNewRepeatTest();

	if (passwordValidated && passwordNewValidated && passwordNewRepeatValidated) {
		return {
			oldPassword: passwordInput.value,
			newPassword: passwordNewRepeatInput.value,
		};
	}

	return false;
}
