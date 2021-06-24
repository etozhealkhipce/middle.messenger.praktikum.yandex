import { compile } from "pug";
import Block from "../core/Block";
import { Sidebar } from "../components/Sidebar";
import { Chat } from "../components/Chat";
import * as users from "../mock/users.json";
import chatEvents from "../components/Chat/events";
import sidebarEvents from "../components/Sidebar/events";

const events: Events = {
	chatEvents,
	sidebarEvents,
};

const template: string = `
block content
    main.content-wrapper
        | !{sidebar}
        | !{chat}
`;

export default class ActiveMessenger extends Block {
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
