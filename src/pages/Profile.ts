import { render } from 'pug';
import Block from '../core/Block';
import { Sidebar } from '../components/Sidebar';
import { ProfileCart } from '../components/ProfileCart';
// import * as users from '../mock/users.json';

const template: string = `
main.content-wrapper
	.sidebar-wrapper
	.profile-cart-wrapper`;

export default class Profile extends Block {
	constructor(props: any) {
		super({
			tagName: 'template',
			children: [
				{
					component: Sidebar,
					// props: {
					// 	users,
					// },
					rootQuery: '.sidebar-wrapper',
				},
				{
					component: ProfileCart,
					props: {
						edit: false,
						changePassword: false,
					},
					rootQuery: '.profile-cart-wrapper',
				},
			],
			...props,
		});
	}

	render(): string {
		return render(template);
	}
}
