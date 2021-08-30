import { compile } from 'pug';
import icon from 'url:../assets/icons/squares.svg';
import Block from '../core/Block';
import { Sidebar } from '../components/Sidebar';
import { Chat } from '../components/Chat';
import { Create } from '../components/Create';
import { AddUser } from '../components/AddUser';
import * as users from '../mock/users.json';

const template: string = `
main.content-wrapper
	.sidebar-wrapper

	.content-wrapper__content
		if chat
			.header
				h3.header__title #{chat.title}
				button(type="button" id="toggle").header__toggle
					img(src=icon)
				.header__dropdown.hidden
					ul
						li.create-link Создать чат
					if addUserLink
						ul
							li.add-user-link Добавить пользователя в чат
		if notEmpty
			.chat-wrapper
		else if createChat
			.content-wrapper__content_center
				.create-wrapper
		else if addUser
			.content-wrapper__content_center
				.add-user-wrapper
		else
			.content-wrapper__content_center
				h3.empty Выберите чат чтобы отправить сообщение	
`;

export default class Messenger extends Block {
	constructor(params: any) {
		super({
			tagName: 'template',
			children: [
				{
					component: Sidebar,
					rootQuery: '.sidebar-wrapper',
					props: {
						users,
					},
				},
				{
					component: Chat,
					rootQuery: '.chat-wrapper',
					props: {},
				},
				{
					component: AddUser,
					rootQuery: '.add-user-wrapper',
					props: {
						id: params.chat ? JSON.parse(params.chat).id : null,
					},
				},
				{
					component: Create,
					rootQuery: '.create-wrapper',
				},
			],
			rootQuery: params.rootQuery,
			props: {
				icon,
				notEmpty: params.notEmpty,
				createChat: params.createChat,
				addUserLink: params.addUserLink,
				addUser: params.addUser,
				chat: params.chat ? JSON.parse(params.chat) : null,
			},
		});
	}

	render(): string {
		return compile(template)(this.props);
	}
}
