import { compile } from "pug";
import Block from "../core/Block";
import { Login } from "../components/Login";
import signInEvents from "../components/Login/events";

const events: Events = {
	signInEvents,
};

const template: string = `
main.login
	| !{login}
`;

export default class SignIn extends Block {
	constructor() {
		super(
			"template",
			{
				login: new Login().render(),
			},
			events
		);
	}

	render(): string {
		return compile(template)(this.props);
	}
}
