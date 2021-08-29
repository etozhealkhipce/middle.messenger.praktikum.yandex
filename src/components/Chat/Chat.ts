import { compile } from 'pug';
import Block from '../../core/Block';
import { Button } from '../ui/Button';
import merge from '../../utils/merge';
import { Input } from '../ui/Input';
import './_chat.scss';
import events from './events';

const template: string = `
.chat
    // .header
    //     h3.header__title Иван
    //     button(type="button" id="deleteBtn").header__delete
    //         img(src=trashIcon)
    .body
        span.body__date 28 мая
            
        .body__left-message
            .body__message-wrapper
                .body__message
                    | Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.
                    | Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
                    | Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                        
                span.body__time 09:49

        .body__right-message
            .body__message-wrapper
                .body__message ого!                    
                span.body__time 10:02
        .body__right-message
            .body__message-wrapper
                .body__message ого!                    
                span.body__time 10:02
        .body__right-message
                .body__message-wrapper
                .body__message ого!                    
                span.body__time 10:02
        .body__right-message
            .body__message-wrapper
                .body__message ого!                   
                span.body__time 10:02
        .body__right-message
            .body__message-wrapper
                .body__message ого!                    
                span.body__time 10:02
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
		});

		super(data);
	}

	render() {
		return compile(template)(this.props);
	}
}
