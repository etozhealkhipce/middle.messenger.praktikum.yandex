import { render } from 'pug';
import Block from '../core/Block';
import { Sidebar } from '../components/Sidebar';
import { ProfileCart } from '../components/ProfileCart';
// import * as users from '../mock/users.json';

const template: string = `
main.content-wrapper
	.sidebar-wrapper
	.profile-cart-wrapper.content-wrapper__content`;

export default class Profile extends Block {
	constructor(params: any) {
		console.log(params);
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
					rootQuery: '.profile-cart-wrapper',
					...params.profileCart,
				},
			],
			rootQuery: params.rootQuery,
		});
	}

	render(): string {
		return render(template);
	}
}
