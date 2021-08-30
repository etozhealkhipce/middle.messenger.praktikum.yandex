import { compile } from 'pug';
import Block from '../../core/Block';
import { Button } from '../ui/Button';
import { ScrollList } from '../ui/ScrollList';
import './_removeUser.scss';
import merge from '../../utils/merge';
import events from './events';

const template: string = `
div(data-id=id).remove
	.remove__users-wrapper
	.remove__added-users-wrapper
	.remove__button-wrapper
`;

export default class RemoveUser extends Block {
	constructor(parentData: any) {
		console.log(parentData);
		const data: any = merge(parentData, {
			tagName: 'template',
			children: [
				{
					component: Button,
					props: {
						buttonType: 'submit',
						buttonId: 'removeButton',
						buttonText: 'Удалить пользователей',
						buttonName: 'removeButton',
						buttonClass: 'type__button',
					},
					rootQuery: '.remove__button-wrapper',
				},
				{
					component: ScrollList,
					props: {
						actionName: 'Добавить',
						actionClass: 'add',
						actionId: 'addUser',
					},
					rootQuery: '.remove__users-wrapper',
					selector: 'current-users',
				},
				{
					component: ScrollList,
					props: {
						actionName: 'Убрать',
						actionClass: 'remove-button',
						actionId: 'removeUser',
					},
					rootQuery: '.remove__added-users-wrapper',
					selector: 'remove-users',
				},
			],
			events,
		});

		super(data);
	}

	render() {
		return compile(template)(this.props);
	}
}
