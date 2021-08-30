import EditUserAPI from '../api/user/edit.api';
import EditPasswordAPI from '../api/user/password.api';
import SearchUserAPI from '../api/user/search.api';
// import EditAvatarAPI from '../api/user/avatar.api';
// import UserAPI from '../api/user/user.api';
import Store from '../core/Store';
import Router from '../core/Router/Router';
import {
	editUserValidate,
	editPasswordValidate,
} from '../services/userValidate';

const editUserAPI = new EditUserAPI();
const editPasswordAPI = new EditPasswordAPI();
const searchUserAPI = new SearchUserAPI();
// const editAvatarAPI = new EditAvatarAPI();

class UserController {
	userData: UpdateUserData | Boolean;

	userPassword: UpdateUserPassword | Boolean;

	public async editUser() {
		try {
			this.userData = editUserValidate();

			await editUserAPI.update(this.userData);
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
			this.userPassword = editPasswordValidate();

			await editPasswordAPI.update(this.userPassword);
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
			const response: string = await searchUserAPI.request(login);

			return JSON.parse(response);
		} catch (error) {
			console.log(error);
		}
	}
}

export default new UserController();
