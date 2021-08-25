import RegisterAPI from '../api/auth/register.api';
import LoginAPI from '../api/auth/login.api';
import LogoutAPI from '../api/auth/logout.api';
import Store from '../core/Store';
import Router from '../core/Router/Router';
import { registerValidate, loginValidate } from '../services/authValidate';

const registerAPI = new RegisterAPI();
const loginAPI = new LoginAPI();
const logoutAPI = new LogoutAPI();

class AuthController {
	userData: LoginUserData | RegisterUserData | Boolean;

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

				Router.go('/inactivechat');
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
}

export default new AuthController();
