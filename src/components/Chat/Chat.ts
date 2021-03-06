import { compile } from 'pug';
import Block from '../../core/Block';
import { Button } from '../ui/Button';
import merge from '../../utils/merge';
import { Input } from '../ui/Input';
import './_chat.scss';
import events from './events';

const template: string = `
.chat
	.body
		span.body__date #{new Date().toLocaleDateString()}

		if messages
			each message in messages
				if message.content
					if message.self
						.body__left-message
							.body__message-wrapper
								.body__name #{message.name}
								.body__message #{message.content}
										
								span.body__time #{message.time}
					else
						.body__right-message
							.body__message-wrapper
								.body__name #{message.name}
								.body__message #{message.content}             
								span.body__time #{message.time}
		else
			span.body__date Нет сообщений

	form.type#messageForm
		.type-input-wrapper
		.type-button-wrapper`;

export default class Chat extends Block {
	constructor(parentData: any) {
		const data: any = merge(parentData, {
			tagName: 'template',
			children: [
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'messageInput',
						inputName: 'messageInput',
						inputPlaceholder: 'Введите сообщение',
						inputClass: 'type__input',
					},
					rootQuery: '.type-input-wrapper',
				},
				{
					component: Button,
					props: {
						buttonType: 'submit',
						buttonId: 'sendMessageButton',
						buttonText: '',
						buttonName: 'sendMessageButton',
						buttonClass: 'type__button',
					},
					rootQuery: '.type-button-wrapper',
				},
			],
			events,
			selector: 'chat-data',
		});

		super(data);
	}

	render() {
		return compile(template)(this.props);
	}
}
