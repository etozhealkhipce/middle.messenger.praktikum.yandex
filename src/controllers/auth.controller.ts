import { Register } from '../api/register.api';

const chatsAPI = new Register();

export default class AuthController {
	start() {
		return this;
	}

	public async signUp(data: UserData) {
		const response = await chatsAPI.create(data);
		console.log(response);
	}
}
