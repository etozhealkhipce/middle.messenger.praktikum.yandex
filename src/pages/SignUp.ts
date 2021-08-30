import { render } from 'pug';
import Block from '../core/Block';
import { Register } from '../components/Register';

const template: string = `
main.register
`;

export default class SignUp extends Block {
	constructor(props: any) {
		super({
			tagName: 'template',
			children: [
				{
					component: Register,
					rootQuery: '.register',
				},
			],
			...props,
		});
	}

	render(): string {
		return render(template);
	}
}
