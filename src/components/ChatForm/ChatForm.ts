import { compile } from 'pug';
import Block from '../../core/Block';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import './_chatForm.scss';
import merge from '../../utils/merge';
import events from './events';

const template: string = `
.chat-form__input-wrapper
p.login-cart__error.create-chat-error.hidden Чат с таким названием уже существует
.chat-form__button-wrapper
`;

export default class Create extends Block {
	constructor(parentData: any) {
		const data: any = merge(parentData, {
			tagName: 'template',
			children: [
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'createInput',
						inputName: 'createInput',
						inputPlaceholder: 'Введите название чата',
						inputClass: 'type__input',
					},
					rootQuery: '.chat-form__input-wrapper',
				},
				{
					component: Button,
					props: {
						buttonType: 'submit',
						buttonId: 'createButton',
						buttonText: 'Создать чат',
						buttonName: 'createButton',
						buttonClass: 'type__button',
					},
					rootQuery: '.chat-form__button-wrapper',
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
