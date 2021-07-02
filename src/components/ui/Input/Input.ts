import { compile } from "pug";
import Block from "../../../core/Block";
import "./_input.scss";

type Props = {
	inputType: string;
	inputId: number | string;
	inputName: string;
	inputPlaceholder?: string;
	inputValue?: string;
	inputDisabled?: Boolean;
	inputClass?: string;
};

const template: string = `
input(type=inputType id=inputId name=inputName placeholder=inputPlaceholder value=inputValue disabled=inputDisabled class=inputClass)&attributes(attributes).input`;

export default class Input extends Block {
	constructor(props: Props) {
		super({ tagName: "template", props });
	}

	render(): string {
		return compile(template)(this.props);
	}
}
