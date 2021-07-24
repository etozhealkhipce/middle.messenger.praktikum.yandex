import { compile } from 'pug';
import Block from '../../core/Block';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import './_login.scss';
import events from './events';
import merge from '../../utils/merge';

const template: string = `
form.login-cart#loginForm
	h1.login-cart__title Вход
	label(for="login").label Логин
	.login-wrapper
	p.login-cart__error.login-error.hidden Неверный логин
	label(for="password").label Пароль
	.password-wrapper
	p.login-cart__error.password-error.hidden Минимум восемь символов
	.loginBtn-wrapper
	a.login-cart__link Забыли пароль?
	.registerBtn-wrapper`;

export default class Login extends Block {
	constructor(parentData: any) {
		const data: any = merge(parentData, {
			tagName: 'form',
			children: [
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'login',
						inputName: 'login',
						inputPlaceholder: 'Введите логин',
						inputClass: 'login-cart__input',
					},
					rootQuery: '.login-wrapper',
				},
				{
					component: Input,
					props: {
						inputType: 'password',
						inputId: 'password',
						inputName: 'password',
						inputPlaceholder: 'Введите пароль',
						inputClass: 'login-cart__input',
					},
					rootQuery: '.password-wrapper',
				},
				{
					component: Button,
					props: {
						buttonType: 'submit',
						buttonId: 'loginBtn',
						buttonText: 'Авторизоваться',
						buttonName: 'loginBtn',
						buttonClass: 'loginBtn',
						buttonDisabled: false,
					},
					rootQuery: '.loginBtn-wrapper',
					selector: 'loginBtn',
				},
				{
					component: Button,
					props: {
						buttonType: 'button',
						buttonId: 'registerBtn',
						buttonText: 'Регистрация',
						buttonName: 'registerBtn',
						buttonClass: 'login-cart__button_gray registerBtn',
					},
					rootQuery: '.registerBtn-wrapper',
				},
			],
			events,
			classes: ['form', 'login-cart#loginForm'],
		});

		super(data);
	}

	render(): string {
		return compile(template)(this.props);
	}
}
