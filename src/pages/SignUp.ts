import { compile } from "pug";
import Block from "../core/Block";
import { Register } from "../components/Register";

const template: string = `
main.register
	| !{register}
`;

export default class SignUp extends Block {
	constructor() {
		const register = new Register();

		super({
			tagName: "template",
			props: {
				register: register.render(),
			},
			events: {
				...register.getEvents(),
			},
		});
	}

	render(): string {
		return compile(template)(this.props);
	}
}
