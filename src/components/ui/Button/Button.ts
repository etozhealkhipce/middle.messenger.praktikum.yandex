import { compile } from "pug";
import Block from "../../../core/Block";
import "./_button.scss";

type Props = {
	buttonType: string;
	buttonId: number | string;
	buttonName: string;
	buttonClass?: string;
	buttonText?: string;
};

const template: string = `
button(type=buttonType id=buttonId name=buttonName class=buttonClass)&attributes(attributes).button=buttonText`;

export default class Button extends Block {
	constructor(props: Props) {
		super("template", props);
	}

	render(): string {
		return compile(template)(this.props);
	}
}
