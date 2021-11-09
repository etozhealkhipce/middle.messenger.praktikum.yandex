import RegisterAPI from '../api/auth/register.api';
import UserAPI from '../api/auth/authority.api';
import LoginAPI from '../api/auth/login.api';
import LogoutAPI from '../api/auth/logout.api';
import AvatarAPI from '../api/user/avatar.api';
import Store from '../core/Store';
import Router from '../core/Router/Router';
import { registerValidate, loginValidate } from '../services/authValidate';
import bufferToBase64 from '../utils/bufferToBase64';

const registerAPI = new RegisterAPI();
const userAPI = new UserAPI();
const loginAPI = new LoginAPI();
const logoutAPI = new LogoutAPI();
const avatarAPI = new AvatarAPI();

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
			const autorizeError = <HTMLParagraphElement>(
				document.querySelector('.autorize-error')
			);
			autorizeError.classList.add('hidden');

			if (userData) {
				Store.set('loginBtn', {
					buttonDisabled: true,
				});

				try {
					await loginAPI.create(userData);
					Router.go('/messenger', { notEmpty: false });
				} catch (error) {
					if (autorizeError) {
						autorizeError.classList.remove('hidden');
					}
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
				localStorage.setItem('authority', JSON.stringify(response));
				// eslint-disable-next-line @typescript-eslint/naming-convention
				const { login, avatar, email, phone, first_name, second_name } =
					response;

				const buffer: unknown = await avatarAPI.request(avatar);

				let b64;

				if (buffer instanceof ArrayBuffer) {
					b64 = bufferToBase64(buffer);
				}

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
				Store.set('main-profile', {
					avatar: `data:image;base64,${b64}`,
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
}

export default new AuthController();
