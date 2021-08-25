import AvatarAPI from '../api/user/avatar.api';
import EditAPI from '../api/user/edit.api';
import PasswordAPI from '../api/user/password.api';
import UserAPI from '../api/user/user.api';
import Store from '../core/Store';
import Router from '../core/Router/Router';
import { registerValidate, loginValidate } from '../services/authValidate';

const AvatarAPI = new AvatarAPI();
const EditAPI = new EditAPI();
const PasswordAPI = new PasswordAPI();
const userAPI = new UserAPI();

class UserController {
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

			if (response) {
				const { login, email, phone, first_name, second_name } =
					JSON.parse(response);

				Store.set('profileCart', {
					children: {
						login: { inputValue: login },
						email: { inputValue: email },
						phone: { inputValuej: phone },
						name: { inputValue: first_name },
						surname: { inputValue: second_name },
					},
					main: {
						name: first_name,
						surname: second_name,
					},
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
}

export default new UserController();
