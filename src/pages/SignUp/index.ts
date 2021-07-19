import Block from '../../core/Block';
import { Register } from '../../components/Register';
import render from '../../services/render';
import store from './store';

const template: string = `
main.register
	| !{register}
`;

export default class SignUp extends Block {
	constructor() {
		const register = new Register();

		super({
			template,
			tagName: 'template',
			props: {
				register: register.getContent(),
			},
			events: {
				register: register.getEvents(),
			},
			store,
		});
	}

	render(): void {
		console.log(this);
		render('#app', this);
	}
}
