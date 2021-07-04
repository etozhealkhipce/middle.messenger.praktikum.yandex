import { compile } from "pug";
import Block from "../core/Block";
import { Sidebar } from "../components/Sidebar";
import { Chat } from "../components/Chat";
import * as users from "../mock/users.json";

const template: string = `
block content
    main.content-wrapper
        | !{sidebar}
        .content-wrapper__content.content-wrapper__content_center
            h3.empty Выберите чат чтобы отправить сообщение
`;

export default class InactiveMessenger extends Block {
	constructor() {
		const sidebar = new Sidebar({ users });
		const chat = new Chat({});
		console.log({
			events: {
				sidebar: sidebar.getEvents(),
				chat: chat.getEvents(),
			},
		});

		super({
			tagName: "template",
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
