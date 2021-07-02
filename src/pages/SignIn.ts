import { compile } from "pug";
import Block from "../core/Block";
import { Login } from "../components/Login";

const template: string = `
main.login
	| !{login}
`;

export default class SignIn extends Block {
	constructor() {
		const login = new Login();

		super({
			tagName: "template",
			props: {
				login: login.render(),
			},
			events: {
				...login.getEvents(),
			},
		});
	}

	render(): string {
		return compile(template)(this.props);
	}
}
