import { compile } from "pug";
import Block from "../../core/Block";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { UserPreview } from "../ui/userPreview";
import "./_sidebar.scss";
import events from "./events";

type Props = Record<string, any>;

const template: string = `
aside.sidebar
    .search
        | !{searchInput}
    a(href="./chat.pug")
    | !{userPreview}
    a(href="./profile.pug")
    | !{profileButton}`;

export default class Sidebar extends Block {
	constructor(props: Props) {
		super({
			tagName: "template",
			props: {
				searchInput: new Input({
					inputType: "text",
					inputId: "3",
					inputName: "search",
					inputPlaceholder: "Поиск",
					inputClass: "search__input",
				}).render(),
				profileButton: new Button({
					buttonType: "button",
					buttonId: "profileBtn",
					buttonText: "Профиль",
					buttonName: "profileBtn",
					buttonClass: "profile",
				}).render(),
				userPreview: new UserPreview({ users: props.users }).render(),
				...props,
			},
			events: {
				events,
			},
		});
	}

	render(): string {
		return compile(template)(this.props);
	}
}
