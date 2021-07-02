import { compile } from "pug";
import Block from "../core/Block";
import { Sidebar } from "../components/Sidebar";
import { ProfileCart } from "../components/ProfileCart";
import * as users from "../mock/users.json";

type Props = {
	edit: Boolean;
	changePassword: Boolean;
};

const template: string = `
main.content-wrapper
	| !{sidebar}
	| !{profileCart}
`;

export default class Profile extends Block {
	constructor(props: Props) {
		const sidebar = new Sidebar({ users });
		const profileCart = new ProfileCart(props);

		super({
			tagName: "template",
			props: {
				sidebar: sidebar.render(),
				profileCart: profileCart.render(),
			},
			events: {
				...sidebar.getEvents(),
				...profileCart.getEvents(),
			},
		});
	}

	render(): string {
		return compile(template)(this.props);
	}
}
