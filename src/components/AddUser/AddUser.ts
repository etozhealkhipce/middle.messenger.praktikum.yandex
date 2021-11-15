import { compile } from 'pug';
import Block from '../../core/Block';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ScrollList } from '../ui/ScrollList';
import './_addUser.scss';
import merge from '../../utils/merge';
import events from './events';

const template: string = `
div(data-id=id).add
	.add__input-wrapper
	p.login-cart__error.create-chat-error.hidden Пользователь уже есть в чате!
	.add__users-wrapper
	.add__added-users-wrapper
	.add__button-wrapper
`;

export default class AddUser extends Block {
	constructor(parentData: any) {
		const data: any = merge(parentData, {
			tagName: 'template',
			children: [
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'addInput',
						inputName: 'addInput',
						inputPlaceholder: 'Введите логин пользователя',
						inputClass: 'type__input',
					},
					rootQuery: '.add__input-wrapper',
				},
				{
					component: Button,
					props: {
						buttonType: 'submit',
						buttonId: 'addButton',
						buttonText: 'Добавить пользователей',
						buttonName: 'addButton',
						buttonClass: 'type__button',
					},
					rootQuery: '.add__button-wrapper',
				},
				{
					component: ScrollList,
					props: {
						actionName: 'Добавить',
						actionClass: 'add',
						actionId: 'addUser',
					},
					rootQuery: '.add__users-wrapper',
					selector: 'add-user',
				},
				{
					component: ScrollList,
					props: {
						actionName: 'Удалить',
						actionClass: 'remove-button',
						actionId: 'removeUser',
					},
					rootQuery: '.add__added-users-wrapper',
					selector: 'added-user',
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
