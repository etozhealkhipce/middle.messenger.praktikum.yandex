import { compile } from "pug";
import Block from "../core/Block";
import { ErrorMessage } from "../components/ErrorMessage";

import errorEvents from "../components/ErrorMessage/events";

const events = {
	errorEvents,
};

const template = `
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

	render() {
		return compile(template)(this.props);
	}
}
