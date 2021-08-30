import { render } from 'pug';
import Block from '../core/Block';
import { Login } from '../components/Login';

const template: string = `main.login`;

export default class SignIn extends Block {
	constructor(props: any) {
		super({
			tagName: 'template',
			children: [
				{
					component: Login,
					rootQuery: '.login',
				},
			],
			...props,
		});
	}

	render(): string {
		return render(template);
	}
}
