import { compile } from "pug";
import Block from "../../../core/Block";
import "./_button.scss";

const template = `
button(type=buttonType id=buttonId name=buttonName class=buttonClass)&attributes(attributes).button=buttonText`;

export default class Button extends Block {
	constructor(props: any) {
		super("template", props);
	}

	render() {
		return compile(template)(this.props);
	}
}
