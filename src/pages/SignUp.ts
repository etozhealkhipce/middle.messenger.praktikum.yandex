import { compile } from "pug";
import Block from "../core/Block";
import { Register } from "../components/Register";

import signUpEvents from "../components/Register/events";

const events = {
	signUpEvents,
};

const template = `
main.register
	| !{register}
`;

export default class SignUp extends Block {
	constructor() {
		super(
			"template",
			{
				register: new Register().render(),
			},
			events
		);
	}

	render() {
		return compile(template)(this.props);
	}
}
