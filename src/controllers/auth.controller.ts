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
	public async signUp() {
		try {
			const userData = registerValidate();

			if (userData) {
				Store.set('registerBtn', {
					buttonDisabled: true,
				});

				await registerAPI.create(userData);

				Router.go('/');
			} else {
				throw new Error('Неверный формат данных');
			}
		} catch (error) {
			Store.set('login-data', {
				authError: error.reason,
			});
			console.log(error);
		} finally {
			Store.set('registerBtn', {
				buttonDisabled: false,
			});
		}
	}

	public async signIn() {
		try {
			const userData = loginValidate();

			if (userData) {
				Store.set('loginBtn', {
					buttonDisabled: true,
				});

				try {
					await loginAPI.create(userData);
					localStorage.setItem('login', 'true');
					Router.go('/messenger', { notEmpty: false });
				} catch (error) {
					Store.set('login-data', {
						authError: error.reason,
					});
				}
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
			localStorage.clear();
		} catch (error) {
			console.log(error);
		} finally {
			Router.go('/');
		}
	}
}

export default new AuthController();
