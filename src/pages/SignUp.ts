import { compile } from "pug";
import Block from "../core/Block";
import { Register } from "../components/Register";

const template = `
main.register
	| !{register}
`;

export default class SignUp extends Block {
	constructor() {
		super("template", {
			register: new Register().render(),
		});
	}

	render() {
		return compile(template)(this.props);
	}
}
