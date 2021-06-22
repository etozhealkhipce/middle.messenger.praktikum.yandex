import { compile } from "pug";
import Block from "../core/Block";
import { Sidebar } from "../components/Sidebar";
import { ProfileCart } from "../components/ProfileCart";
import * as users from "../mock/users.json";

import profileCartEvents from "../components/ProfileCart/events";
import sidebarEvents from "../components/Sidebar/events";

const events = {
	profileCartEvents,
	sidebarEvents,
};

const template = `
main.content-wrapper
	| !{sidebar}
	| !{profileCart}
`;

export default class Profile extends Block {
	constructor(props: { edit: Boolean; changePassword: Boolean }) {
		super(
			"template",
			{
				sidebar: new Sidebar({ users }).render(),
				profileCart: new ProfileCart(props).render(),
			},
			events
		);
	}

	render() {
		return compile(template)(this.props);
	}
}
