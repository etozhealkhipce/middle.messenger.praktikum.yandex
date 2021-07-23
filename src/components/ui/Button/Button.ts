import { compile } from 'pug';
import Block from '../../../core/Block';
import './_button.scss';

const template: string = `
button(type=buttonType id=buttonId name=buttonName class=buttonClass disabled=buttonDisabled)&attributes(attributes).button=buttonText`;

export default class Button extends Block {
	constructor({ props, rootQuery, selector }: ButtonT) {
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
