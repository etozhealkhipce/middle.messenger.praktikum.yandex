import Block from '../../../core/Block';
import './_button.scss';

type Props = {
	buttonType: string;
	buttonId: number | string;
	buttonName: string;
	buttonClass?: string;
	buttonText?: string;
	buttonDisabled?: any;
};

const template: string = `
button(type=buttonType id=buttonId name=buttonName class=buttonClass disabled=buttonDisabled)&attributes(attributes).button=buttonText`;

export default class Button extends Block {
	constructor(props: Props) {
		super({
			template,
			tagName: 'template',
			props,
		});
	}
}
