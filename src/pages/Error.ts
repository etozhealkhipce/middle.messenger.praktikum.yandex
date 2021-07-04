import { compile } from "pug";
import Block from "../core/Block";
import { ErrorMessage } from "../components/ErrorMessage";

const template: string = `
main.error
	| !{error}
`;

export default class Error extends Block {
	constructor(props: any) {
		const error = new ErrorMessage({ ...props });

		super({
			tagName: "template",
			props: {
				error: error.render(),
			},
			events: {
				error: error.getEvents(),
			},
		});
	}

	render(): string {
		return compile(template)(this.props);
	}
}
