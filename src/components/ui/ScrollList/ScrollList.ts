import { compile } from 'pug';
import Block from '../../../core/Block';
import events from './events';
import './_scrollList.scss';

const template: string = `
if users
	.scroll-list__list
			each user, id in users
				.scroll-list__user
					span.scroll-list__list-item #{user.first_name} #{user.second_name}
					a(class=actionClass, id=actionId, data-user=user).scroll-list__action #{actionName}`;

export default class ScrollList extends Block {
	constructor({ props, rootQuery, selector }: InputT) {
		super({
			tagName: 'template',
			props,
			rootQuery,
			selector,
			events,
		});
	}

	render(): string {
		return compile(template)(this.props);
	}
}
