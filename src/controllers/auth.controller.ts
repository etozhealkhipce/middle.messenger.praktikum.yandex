import RegisterAPI from '../api/auth/register.api';
import UserAPI from '../api/auth/user.api';
import LoginAPI from '../api/auth/login.api';
import LogoutAPI from '../api/auth/logout.api';
import Store from '../core/Store';
import Router from '../core/Router/Router';
import { registerValidate, loginValidate } from '../services/authValidate';

const registerAPI = new RegisterAPI();
const userAPI = new UserAPI();
const loginAPI = new LoginAPI();
const logoutAPI = new LogoutAPI();

class AuthController {
	userData: LoginUserData | Boolean;

	public async signUp() {
		try {
			this.userData = registerValidate();

			if (this.userData) {
				Store.set('registerBtn', {
					buttonDisabled: true,
				});

				await registerAPI.create(this.userData);

				Router.go('/');
			} else {
				throw new Error('Неверный формат данных');
			}
		} catch (error) {
			console.log(error);
		} finally {
			Store.set('registerBtn', {
				buttonDisabled: false,
			});
		}
	}

	public async signIn() {
		try {
			this.userData = loginValidate();

			if (this.userData) {
				Store.set('loginBtn', {
					buttonDisabled: true,
				});

				await loginAPI.create(this.userData);

				Router.go('/messenger', { notEmpty: false });
			} else {
				throw new Error('Неверный формат данных');
			}
		} catch (error) {
			console.log(error);
		} finally {
			Store.set('loginBtn', {
				buttonDisabled: false,
			});
		}
	}

	public async logout() {
		try {
			await logoutAPI.request();
		} catch (error) {
			console.log(error);
		} finally {
			Router.go('/');
		}
	}

	public async getUserinfo() {
		try {
			const response: any = await userAPI.request();

			if (response) {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				const { login, email, phone, first_name, second_name } = response;

				Store.set('login-profile', {
					inputValue: login,
				});
				Store.set('email-profile', {
					inputValue: email,
				});
				Store.set('phone-profile', {
					inputValue: phone,
				});
				Store.set('first_name-profile', {
					inputValue: first_name,
				});
				Store.set('second_name-profile', {
					inputValue: second_name,
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
}

export default new AuthController();
