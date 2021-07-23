import { compile } from 'pug';
import Block from '../../../core/Block';
import './_input.scss';

const template: string = `
input(type=inputType id=inputId name=inputName placeholder=inputPlaceholder value=inputValue disabled=inputDisabled class=inputClass)&attributes(attributes).input`;

export default class Input extends Block {
	constructor({ props, rootQuery, selector }: InputT) {
		super({
			tagName: 'template',
			props,
			rootQuery,
			selector,
		});
	}

	render(): string {
		return compile(template)(this.props);
	}
}
