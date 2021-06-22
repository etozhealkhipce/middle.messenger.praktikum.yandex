import { compile } from "pug";
import Block from "../core/Block";
import { Login } from "../components/Login";

const template = `
main.login
	| !{login}
`;

export default class SignIn extends Block {
	constructor() {
		super("template", {
			login: new Login({}).render(),
		});
	}

	render() {
		return compile(template)(this.props);
	}
}
