import { compile } from "pug";
import Block from "../core/Block";
import { Sidebar } from "../components/Sidebar";
import { Chat } from "../components/Chat";
import * as users from "../mock/users.json";

const template = `
block content
    main.content-wrapper
        | !{sidebar}
        .content-wrapper__content.content-wrapper__content_center
            h3.empty Выберите чат чтобы отправить сообщение
`;

export default class InactiveMessenger extends Block {
	constructor() {
		super("template", {
			sidebar: new Sidebar({ users }).render(),
			chat: new Chat({}).render(),
		});
	}

	render() {
		return compile(template)(this.props);
	}
}