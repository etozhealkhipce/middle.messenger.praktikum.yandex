import { compile } from "pug";
import Block from "../core/Block";
import { ErrorMessage } from "../components/ErrorMessage";

import errorEvents from "../components/ErrorMessage/events";

const events: Record<string, Function> = {
	errorEvents,
};

const template: string = `
main.error
	| !{error}
`;

export default class Error extends Block {
	constructor(props: any) {
		super(
			"template",
			{
				error: new ErrorMessage({ ...props }).render(),
			},
			events
		);
	}

	render(): string {
		return compile(template)(this.props);
	}
}
