import { compile } from "pug";
import Block from "../core/Block";
import { Sidebar } from "../components/Sidebar";
import { Chat } from "../components/Chat";
import * as users from "../mock/users.json";
import sidebarEvents from "../components/Sidebar/events";

const events: Events = {
	sidebarEvents,
};

const template: string = `
block content
    main.content-wrapper
        | !{sidebar}
        .content-wrapper__content.content-wrapper__content_center
            h3.empty Выберите чат чтобы отправить сообщение
`;

export default class InactiveMessenger extends Block {
	constructor() {
		super(
			"template",
			{
				sidebar: new Sidebar({ users }).render(),
				chat: new Chat({}).render(),
			},
			events
		);
	}

	render(): string {
		return compile(template)(this.props);
	}
}
