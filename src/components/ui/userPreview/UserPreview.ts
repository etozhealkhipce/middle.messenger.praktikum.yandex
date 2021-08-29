import { compile } from 'pug';
import Block from '../../../core/Block';
import './_userPreview.scss';

const template: string = `
if users
	each user, id in users
		.user-preview
			.user-preview__first-wrapper
				img(src=user.avatar).user-preview__image
			.user-preview__second-wrapper
				span.user-preview__title=user.first_name
				p.user-preview__message=user.messagePreview
else if chats
	each chat, id in chats
		.user-preview
			.user-preview__first-wrapper
				img(src=chat.avatar).user-preview__image
			.user-preview__second-wrapper
				span.user-preview__title=chat.title
				p.user-preview__message=chat.last_message || 'Нет сообщений'
			.user-preview__third-wrapper
				time.user-preview__time=chat.messageTime
				if chat.unread_count
					.user-preview__counter-wrapper
						span.user-preview__counter=chat.unread_count
else
	h3.empty Список чатов пуст`;

export default class UserPreview extends Block {
	constructor({ props, rootQuery, selector }: UserPreviewT) {
		super({
			tagName: 'template',
			props,
			rootQuery,
			selector,
		});
	}

	render(): string {
		console.log(this.props);
		return compile(template)(this.props);
	}
}
