import { compile } from "pug";
import Block from "../../core/Block";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import "./_login.scss";

const template = `
form.login-cart#loginForm
    h1.login-cart__title Вход
    label(for="login").label Логин
    | !{login}
    p.login-cart__error Неверный логин
    label(for="password").label Пароль
    | !{password} 
    p.login-cart__error Неверный пароль
    | !{loginBtn}
    a(href="./inactiveMessenger").login-cart__link Забыли пароль?
    a(href="./register")
    | !{registerBtn}`;

export default class Login extends Block {
	constructor(props: any) {
		super("template", {
			login: new Input({
				inputType: "text",
				inputId: "login",
				inputName: "login",
				inputPlaceholder: "Введите логин",
				inputClass: "login-cart__input",
			}).render(),
			password: new Input({
				inputType: "password",
				inputId: "password",
				inputName: "password",
				inputPlaceholder: "Введите пароль",
				inputClass: "login-cart__input",
			}).render(),
			loginBtn: new Button({
				buttonType: "submit",
				buttonId: "loginBtn",
				buttonText: "Авторизоваться",
				buttonName: "loginBtn",
				buttonClass: "loginBtn",
			}).render(),
			registerBtn: new Button({
				buttonType: "button",
				buttonId: "registerBtn",
				buttonText: "Регистрация",
				buttonName: "registerBtn",
				buttonClass: "login-cart__button_gray registerBtn",
			}).render(),
			...props,
		});
	}

	render() {
		return compile(template)(this.props);
	}
}