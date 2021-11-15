import EditUserAPI from '../api/user/edit.api';
import EditPasswordAPI from '../api/user/password.api';
import SearchUserAPI from '../api/user/search.api';
import UserAPI from '../api/auth/authority.api';
import AvatarAPI from '../api/user/avatar.api';

import Store from '../core/Store';
import bufferToBase64 from '../utils/bufferToBase64';

import Router from '../core/Router/Router';
import {
	editUserValidate,
	editPasswordValidate,
	editAvatarValidate,
} from '../services/userValidate';

const editUserAPI = new EditUserAPI();
const editPasswordAPI = new EditPasswordAPI();
const searchUserAPI = new SearchUserAPI();
const userAPI = new UserAPI();
const avatarAPI = new AvatarAPI();

class UserController {
	public async getUserinfo() {
		try {
			const response: any = await userAPI.request();

			if (response) {
				localStorage.setItem('authority', JSON.stringify(response));
				// eslint-disable-next-line @typescript-eslint/naming-convention
				const { login, avatar, email, phone, first_name, second_name } =
					response;

				const buffer: unknown = await avatarAPI.request(avatar);
				console.log(buffer);

				let b64;

				if (buffer instanceof ArrayBuffer) {
					b64 = bufferToBase64(buffer);
				}

				Store.set('main-profile', {
					avatar: `data:image;base64,${b64}`,
				});
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

	public async editUser() {
		try {
			const userData = editUserValidate();
			const avatar = editAvatarValidate();

			if (avatar) await avatarAPI.update(avatar);
			if (userData) await editUserAPI.update(userData);
		} catch (error) {
			console.log(error);
		} finally {
			Router.go('/settings', {
				profileCart: {
					props: {
						edit: false,
						changePassword: false,
					},
				},
			});
		}
	}

	public async editPassword() {
		try {
			const userPassword = editPasswordValidate();

			if (userPassword) await editPasswordAPI.update(userPassword);
		} catch (error) {
			console.log(error);
		} finally {
			Router.go('/settings', {
				profileCart: {
					props: {
						edit: false,
						changePassword: false,
					},
				},
			});
		}
	}

	public async searchUser(login: string) {
		try {
			const response = await searchUserAPI.request(login);

			return response;
		} catch (error) {
			console.log(error);
		}
	}
}

export default new UserController();
