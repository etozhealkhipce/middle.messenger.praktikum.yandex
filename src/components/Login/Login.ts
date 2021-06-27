import { compile } from "pug";
import Block from "../../core/Block";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import "./_login.scss";
import {
	Test,
	validate,
	toggle,
	multipleListener,
} from "../../services/validate";

const template: string = `
h1.login-cart__title Вход
label(for="login").label Логин
| !{login}
p.login-cart__error.login-error.hidden Неверный логин
label(for="password").label Пароль
| !{password} 
p.login-cart__error.password-error.hidden Минимум восемь символов
| !{loginBtn}
a(href="./inactivechat").login-cart__link Забыли пароль?
a(href="./register")
| !{registerBtn}`;

export default class Login extends Block {
	constructor() {
		super({
			tagName: "form",
			props: {
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
			},
			events: {
				submit: (e: Event): void => {
					e.preventDefault();
					console.log("test");

					const loginInput = <HTMLInputElement>document.getElementById("login");
					const passwordInput = <HTMLInputElement>(
						document.getElementById("password")
					);
					const loginError = <HTMLParagraphElement>(
						document.querySelector(".login-error")
					);
					const passwordError = <HTMLParagraphElement>(
						document.querySelector(".password-error")
					);

					const loginTest = () =>
						toggle(!validate(loginInput.value, Test.login), loginError);
					multipleListener(loginInput, "blur, focus", loginTest);

					const passwordTest = () =>
						toggle(
							!validate(passwordInput.value, Test.password),
							passwordError
						);
					multipleListener(passwordInput, "blur, focus", passwordTest);

					const passwordValidate = passwordTest();
					const loginValidate = loginTest();

					if (passwordValidate && loginValidate) {
						console.log({
							login: loginInput.value,
							password: passwordInput.value,
						});
					}
				},
			},
			classes: ["form", "login-cart#loginForm"],
		});
	}

	render(): string {
		return compile(template)(this.props);
	}
}
// Object.keys(events).forEach(eventName => {
//   this._element.addEventListener(eventName, events[eventName]);
// });
