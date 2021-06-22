import { compile } from "pug";
import Block from "../../../core/Block";
import "./_input.scss";

const template = `
input(type=inputType id=inputId name=inputName placeholder=inputPlaceholder value=inputValue disabled=inputDisabled class=inputClass)&attributes(attributes).input`;

export default class Input extends Block {
	constructor(props: any) {
		super("template", props);
	}

	render() {
		return compile(template)(this.props);
	}
}
