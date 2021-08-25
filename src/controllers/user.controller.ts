import AvatarAPI from '../api/user/avatar.api';
import EditAPI from '../api/user/edit.api';
import PasswordAPI from '../api/user/password.api';
import UserAPI from '../api/user/user.api';
import Store from '../core/Store';
import Router from '../core/Router/Router';
import { registerValidate, loginValidate } from '../services/authValidate';

const avatarAPI = new AvatarAPI();
const editAPI = new EditAPI();
const passwordAPI = new PasswordAPI();

class UserController {
	userData: LoginUserData | RegisterUserData | Boolean;

	public async getUserinfo() {
		try {
			const response: any = await userAPI.request();
		} catch (error) {
			console.log(error);
		}
	}
}

export default new UserController();
