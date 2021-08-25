import { render } from 'pug';
import Block from '../core/Block';
import { Sidebar } from '../components/Sidebar';
import { ProfileCart } from '../components/ProfileCart';
import events from '../components/ProfileCart/events';

// import * as users from '../mock/users.json';

const template: string = `
main.content-wrapper
	.sidebar-wrapper
	.profile-cart-wrapper.content-wrapper__content`;

export default class Profile extends Block {
	constructor(params: any) {
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
			events,
		});
	}

	render(): string {
		return render(template);
	}
}
