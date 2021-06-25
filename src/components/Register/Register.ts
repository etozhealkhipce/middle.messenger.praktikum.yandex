import { compile } from "pug";
import Block from "../../core/Block";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import "./_register.scss";

const template: string = `
form.register-cart#registerForm
    h1.register-cart__title Регистрация
    label(for="email").label Почта
    | !{email}
    p.register-cart__error.email-error.hidden Неверный формат почты
    label(for="login").label Логин
    | !{login}
    p.register-cart__error.login-error.hidden Неверный логин
    label(for="name").label Имя
    | !{name}
    label(for="surname").label Фамилия
    | !{surname}
    label(for="phone").label Телефон
    | !{phone}
    p.register-cart__error.phone-error.hidden Неверный формат телефона
    label(for="password").label Пароль
    | !{password}
    p.register-cart__error.password-error.hidden Пароль должен содержать минимум 8 символов
    label(for="password-repeat").label Повторение пароля
    | !{passwordRepeat}
    p.register-cart__error.password-repeat-error.hidden Пароли не совпадают
    | !{registerBtn}
    a(href="/").register-cart__link Войти`;

export default class Register extends Block {
	constructor() {
		super("template", {
			email: new Input({
				inputType: "text",
				inputId: "email",
				inputName: "email",
				inputPlaceholder: "Введите почту",
				inputClass: "register-cart__input",
			}).render(),
			login: new Input({
				inputType: "text",
				inputId: "login",
				inputName: "login",
				inputPlaceholder: "Введите логин",
				inputClass: "register-cart__input",
			}).render(),
			name: new Input({
				inputType: "text",
				inputId: "name",
				inputName: "name",
				inputPlaceholder: "Введите имя",
				inputClass: "register-cart__input",
			}).render(),
			surname: new Input({
				inputType: "text",
				inputId: "surname",
				inputName: "surname",
				inputPlaceholder: "Введите фамилию",
				inputClass: "register-cart__input",
			}).render(),
			phone: new Input({
				inputType: "text",
				inputId: "phone",
				inputName: "phone",
				inputPlaceholder: "Введите телефон",
				inputClass: "register-cart__input",
			}).render(),
			password: new Input({
				inputType: "password",
				inputId: "password",
				inputName: "password",
				inputPlaceholder: "Введите пароль",
				inputClass: "register-cart__input",
			}).render(),
			passwordRepeat: new Input({
				inputType: "password",
				inputId: "password-repeat",
				inputName: "password-repeat",
				inputPlaceholder: "Введите пароль еще раз",
				inputClass: "register-cart__input",
			}).render(),
			registerBtn: new Button({
				buttonType: "submit",
				buttonId: "registerBtn",
				buttonText: "Зарегистрироваться",
				buttonName: "registerBtn",
				buttonClass: "registerBtn",
			}).render(),
		});
	}

	render(): string {
		return compile(template)(this.props);
	}
}
