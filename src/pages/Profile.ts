import { compile } from "pug";
import Block from "../core/Block";
import { Sidebar } from "../components/Sidebar";
import { ProfileCart } from "../components/ProfileCart";
import * as users from "../mock/users.json";

import profileCartEvents from "../components/ProfileCart/events";
import sidebarEvents from "../components/Sidebar/events";

type Props = {
	edit: Boolean;
	changePassword: Boolean;
};

const events: Record<string, Function> = {
	profileCartEvents,
	sidebarEvents,
};

const template: string = `
main.content-wrapper
	| !{sidebar}
	| !{profileCart}
`;

export default class Profile extends Block {
	constructor(props: Props) {
		super(
			"template",
			{
				sidebar: new Sidebar({ users }).render(),
				profileCart: new ProfileCart(props).render(),
			},
			events
		);
	}

	render(): string {
		return compile(template)(this.props);
	}
}
