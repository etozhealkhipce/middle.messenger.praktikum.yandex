import { render } from 'pug';
import Block from '../../core/Block';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import './_register.scss';
import events from './events';
import merge from '../../utils/merge';

const template: string = `
form.register-cart#registerForm
	h1.register-cart__title Регистрация
	label(for="email").label Почта
	.email
	p.register-cart__error.email-error.hidden Неверный формат почты
	label(for="login").label Логин
	.login
	p.register-cart__error.login-error.hidden Неверный логин
	label(for="name").label Имя
	.name
	label(for="surname").label Фамилия
	.surname
	label(for="phone").label Телефон
	.phone
	p.register-cart__error.phone-error.hidden Неверный формат телефона
	label(for="password").label Пароль
	.password
	p.register-cart__error.password-error.hidden Пароль должен содержать минимум 8 символов
	label(for="password-repeat").label Повторение пароля
	.password-repeat
	p.register-cart__error.password-repeat-error.hidden Пароли не совпадают
	.register-btn
	a.register-cart__link Войти`;

export default class Register extends Block {
	constructor(parentData: any) {
		const data: any = merge(parentData, {
			tagName: 'template',
			children: [
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'email',
						inputName: 'email',
						inputPlaceholder: 'Введите почту',
						inputClass: 'register-cart__input',
					},
					rootQuery: '.email',
				},
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'login',
						inputName: 'login',
						inputPlaceholder: 'Введите логин',
						inputClass: 'register-cart__input',
					},
					rootQuery: '.login',
				},
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'name',
						inputName: 'name',
						inputPlaceholder: 'Введите имя',
						inputClass: 'register-cart__input',
					},
					rootQuery: '.name',
				},
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'surname',
						inputName: 'surname',
						inputPlaceholder: 'Введите фамилию',
						inputClass: 'register-cart__input',
					},
					rootQuery: '.surname',
				},
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'phone',
						inputName: 'phone',
						inputPlaceholder: 'Введите телефон',
						inputClass: 'register-cart__input',
					},
					rootQuery: '.phone',
				},
				{
					component: Input,
					props: {
						inputType: 'password',
						inputId: 'password',
						inputName: 'password',
						inputPlaceholder: 'Введите пароль',
						inputClass: 'register-cart__input',
					},
					rootQuery: '.password',
				},
				{
					component: Input,
					props: {
						inputType: 'password',
						inputId: 'password-repeat',
						inputName: 'password-repeat',
						inputPlaceholder: 'Введите пароль еще раз',
						inputClass: 'register-cart__input',
					},
					rootQuery: '.password-repeat',
				},
				{
					component: Button,
					props: {
						buttonType: 'submit',
						buttonId: 'registerBtn',
						buttonText: 'Зарегистрироваться',
						buttonName: 'registerBtn',
						buttonClass: 'registerBtn',
						buttonDisabled: false,
					},
					rootQuery: '.register-btn',
					selector: 'registerBtn',
				},
			],
			events,
		});

		super(data);
	}

	render(): string {
		return render(template);
	}
}
