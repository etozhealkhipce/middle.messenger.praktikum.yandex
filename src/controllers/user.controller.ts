import UserAPI from '../api/auth/user.api';
import ResourcesAPI from '../api/auth/resources.api';
import { userValidate } from '../services/userValidate';
import Store from '../core/Store';

const userAPI = new UserAPI();
const resourcesAPI = new ResourcesAPI();

class UserController {
	public async getUserinfo() {
		try {
			const response: any = await userAPI.request();

			if (response) {
				const avatar = await resourcesAPI.request(response.avatar);
				const base64 = `data:image/base64;base64,${btoa(
					unescape(encodeURIComponent(avatar))
				)}`;

				Store.set('main-profile', {
					name: response.first_name,
					surname: response.second_name,
					avatar: base64,
				});

				Object.keys(response).forEach((key) => {
					Store.set(`${key}-profile`, {
						inputValue: response[key],
					});
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	public async changeUserInfo() {
		try {
			const userData = userValidate();

			if (userData) {
				Store.set('saveBtn', {
					buttonDisabled: true,
				});

				await userAPI.update(userData);
			} else {
				throw new Error('Неверный формат данных');
			}
		} catch (error) {
			console.log(error);
		} finally {
			Store.set('saveBtn', {
				buttonDisabled: false,
			});
		}
	}
}

export default new UserController();
