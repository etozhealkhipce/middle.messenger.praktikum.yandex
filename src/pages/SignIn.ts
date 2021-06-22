import { compile } from "pug";
import Block from "../core/Block";
import { Login } from "../components/Login";

import signInEvents from "../components/Login/events";

const events = {
	signInEvents,
};

const template = `
main.login
	| !{login}
`;

export default class SignIn extends Block {
	constructor() {
		super(
			"template",
			{
				login: new Login({}).render(),
			},
			events
		);
	}

	render() {
		return compile(template)(this.props);
	}
}
