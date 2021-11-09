import EditUserAPI from '../api/user/edit.api';
import EditPasswordAPI from '../api/user/password.api';
import SearchUserAPI from '../api/user/search.api';
import EditAvatarAPI from '../api/user/avatar.api';

import Router from '../core/Router/Router';
import {
	editUserValidate,
	editPasswordValidate,
	editAvatarValidate,
} from '../services/userValidate';

const editUserAPI = new EditUserAPI();
const editPasswordAPI = new EditPasswordAPI();
const searchUserAPI = new SearchUserAPI();
const editAvatarAPI = new EditAvatarAPI();

class UserController {
	public async editUser() {
		try {
			const userData = editUserValidate();
			const avatar = editAvatarValidate();

			if (avatar) await editAvatarAPI.update(avatar);
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
