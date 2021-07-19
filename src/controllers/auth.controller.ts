import RegisterStore from '../pages/SignUp/store';
import RegisterAPI from '../api/register.api';
import { Button } from '../components/ui/Button';
import LogoutAPI from '../api/logout.api';
import { Test, validate, toggle, multipleListener } from '../services/validate';

const registerAPI = new RegisterAPI();
const logoutAPI = new LogoutAPI();

export default class AuthController {
	userData: UserData;

	public validate(): Boolean {
		// TODO: переписать валидацию (вынести флаги в store и template)
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

		this.userData = {
			email: (<HTMLInputElement>document.getElementById('email')).value,
			login: (<HTMLInputElement>document.getElementById('login')).value,
			first_name: (<HTMLInputElement>document.getElementById('name')).value,
			second_name: (<HTMLInputElement>document.getElementById('surname')).value,
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
			return true;
		}

		return false;
	}

	public async signUp() {
		try {
			if (this.validate()) {
				// RegisterStore.set(
				// 	'registerBtn',
				// 	new Button({
				// 		buttonType: 'submit',
				// 		buttonId: 'registerBtn',
				// 		buttonText: 'Зарегистрироваться',
				// 		buttonName: 'registerBtn',
				// 		buttonClass: 'registerBtn',
				// 		buttonDisabled: true,
				// 	}).getContent()
				// );
				RegisterStore.set('loading', true);

				// const response = await registerAPI.create(this.userData);

				// console.log(response);
			} else {
				throw new Error('Неверный формат данных');
			}
		} catch (error) {
			console.log(error);
		}
	}

	public async logout() {
		try {
			const response = await logoutAPI.request();
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}
}
