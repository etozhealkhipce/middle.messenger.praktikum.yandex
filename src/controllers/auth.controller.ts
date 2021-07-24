import RegisterAPI from '../api/auth/register.api';
import LoginAPI from '../api/auth/login.api';
import LogoutAPI from '../api/auth/logout.api';
import UserAPI from '../api/auth/user.api';
import Store from '../core/Store';
import Router from '../core/Router/Router';
import { registerValidate, loginValidate } from '../services/authValidate';

const registerAPI = new RegisterAPI();
const loginAPI = new LoginAPI();
const logoutAPI = new LogoutAPI();
const userAPI = new UserAPI();

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
		}
	}

	public async user() {
		try {
			const response: any = await userAPI.request();

			console.log(response);

			// {"id":82914,"first_name":"Илья","second_name":"Дёмин","display_name":null,"login":"alkhipcetest","avatar":null,"email":"alkhipcetest@gmail.com","phone":"87758606824"}

			if (response) {
				Store.set('profileCart', {
					login: { inputValue: JSON.parse(response).login },
					email: { inputValue: JSON.parse(response).email },
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
}

export default new AuthController();
