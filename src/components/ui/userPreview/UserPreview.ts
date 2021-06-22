import { compile } from "pug";
import Block from "../../../core/Block";
import "./_userPreview.scss";

const template = `
if users
	each user, id in users
		.user-preview
			.user-preview__first-wrapper
				img(src=user.imgSrc).user-preview__image
			.user-preview__second-wrapper
				span.user-preview__title=user.name
				p.user-preview__message=messagePreview
			.user-preview__third-wrapper
				time.user-preview__time=user.messageTime
				.user-preview__counter-wrapper
					span.user-preview__counter=user.messageCounter
else
	h3.empty Список чатов пуст`;

export default class UserPreview extends Block {
	constructor(props: any) {
		super("template", props);
	}

	render() {
		return compile(template)(this.props);
	}
}
