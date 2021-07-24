import { compile } from 'pug';
import Block from '../core/Block';
import { Sidebar } from '../components/Sidebar';
import { Chat } from '../components/Chat';
// import * as users from '../mock/users.json';

const template: string = `
block content
    main.content-wrapper
        .sidebar-wrapper
        .content-wrapper__content.content-wrapper__content_center
            h3.empty Выберите чат чтобы отправить сообщение
`;

export default class InactiveMessenger extends Block {
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
					component: Chat,
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
		return compile(template)(this.props);
	}
}
