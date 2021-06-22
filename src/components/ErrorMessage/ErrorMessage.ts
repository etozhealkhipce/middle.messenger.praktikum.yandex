import { compile } from "pug";
import Block from "../../core/Block";
import { Button } from "../ui/Button";
import "./_error.scss";

const template = `
.error-cart
    h1.error-cart__title=errorCode
    p.error-message Страница не существует
    | !{backButton}`;

export default class ErrorMessage extends Block {
	constructor(props: any) {
		super("template", {
			backButton: new Button({
				buttonType: "button",
				buttonId: "backButton",
				buttonText: "Вернуться",
				buttonName: "backButton",
				buttonClass: "error-cart__button back",
			}).render(),
			...props,
		});
	}

	render() {
		return compile(template)(this.props);
	}
}
