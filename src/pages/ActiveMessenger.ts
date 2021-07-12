import { compile } from 'pug';
import Block from '../core/Block';
import { Sidebar } from '../components/Sidebar';
import { Chat } from '../components/Chat';
import * as users from '../mock/users.json';

const template: string = `
block content
    main.content-wrapper
        | !{sidebar}
        | !{chat}
`;

export default class ActiveMessenger extends Block {
	constructor() {
		const sidebar = new Sidebar({ users });
		const chat = new Chat({});

		super({
			tagName: 'template',
			props: {
				sidebar: sidebar.render(),
				chat: chat.render(),
			},
			events: {
				sidebar: sidebar.getEvents(),
				chat: chat.getEvents(),
			},
		});
	}

	render(): string {
		return compile(template)(this.props);
	}
}
