import { compile } from "pug";
import Block from "../../core/Block";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import "./_profileCart.scss";

type Props = {
	edit: Boolean;
	changePassword: Boolean;
};

const template: string = `
block variables

main.content-wrapper__content.content-wrapper__content_profile
    form.profile-cart#profileForm
        .user
            if edit
                .user__first-wrapper.user__first-wrapper_edit
                    label(for="avatar-input").user__avatar-input
                        img().user__image
                    | !{avatar}
            else
                .user__first-wrapper
                    img().user__image

            .user__second-wrapper
                span.user__title Илья
                p.user__surname Фамилия
        

        if !changePassword
            label(for="login").label Логин
            | !{login}
            p.profile-cart__error Неверный логин
            label(for="email").label Почта
            | !{email}
            p.profile-cart__error Неверный формат email
            label(for="phone").label Телефон
            | !{phone}
            p.profile-cart__error Неверный формат телефона
            if edit
                label(for="name").label Имя
                | !{name}
                label(for="surname").label Фамилия
                | !{surname}
        else
            label(for="password").label Пароль
            | !{password}
            p.profile-cart__error Неверный пароль 
            label(for="password-new").label Новый пароль
            | !{passwordNew}
            p.profile-cart__error Неверный пароль 
            label(for="password-new-repeat").label Повторение нового пароля
            | !{passwordNewRepeat}
            p.profile-cart__error Неверный пароль 
        
        .actions
            if !edit && !changePassword
                .actions__left
                    a(href="./profile-edit").actions__link Изменить даннные
                    a(href="./profile-change-password").actions__link Изменить пароль
                .actions__right
                    a(href="./error").actions__link.logout Выйти
            else
                | !{saveBtn}
`;
export default class ProfileCart extends Block {
	events: Record<string, any>;

	constructor(props: Props) {
		super("template", {
			avatar: new Input({
				inputType: "file",
				inputId: "avatar-input",
				inputName: "avatar",
				inputPlaceholder: "",
				inputClass: "profile-cart__input_file",
			}).render(),
			login: new Input({
				inputType: "text",
				inputId: "login",
				inputName: "login",
				inputValue: "alkhipce",
				inputPlaceholder: "Введите логин",
				inputClass: "profile-cart__input",
				inputDisabled: !props.edit,
			}).render(),
			email: new Input({
				inputType: "text",
				inputId: "email",
				inputName: "email",
				inputValue: "alkhipce@mail.ru",
				inputPlaceholder: "Введите почту",
				inputClass: "profile-cart__input",
				inputDisabled: !props.edit,
			}).render(),
			phone: new Input({
				inputType: "text",
				inputId: "phone",
				inputName: "phone",
				inputValue: "+7 777 555 1234",
				inputPlaceholder: "Введите телефон",
				inputClass: "profile-cart__input",
				inputDisabled: !props.edit,
			}).render(),
			name: new Input({
				inputType: "text",
				inputId: "name",
				inputName: "name",
				inputValue: "Илья",
				inputPlaceholder: "Введите имя",
				inputClass: "profile-cart__input",
			}).render(),
			surname: new Input({
				inputType: "text",
				inputId: "surname",
				inputName: "surname",
				inputPlaceholder: "Введите фамилию",
				inputClass: "profile-cart__input",
			}).render(),
			password: new Input({
				inputType: "password",
				inputId: "password",
				inputName: "password",
				inputPlaceholder: "Введите пароль",
				inputClass: "profile-cart__input",
			}).render(),
			passwordNew: new Input({
				inputType: "password",
				inputId: "password-new",
				inputName: "password-new",
				inputPlaceholder: "Введите новый пароль",
				inputClass: "profile-cart__input",
			}).render(),
			passwordNewRepeat: new Input({
				inputType: "password",
				inputId: "password-new-repeat",
				inputName: "password-new-repeat",
				inputPlaceholder: "Введите новый пароль еще раз",
				inputClass: "profile-cart__input",
			}).render(),
			saveBtn: new Button({
				buttonType: "submit",
				buttonId: "saveBtn",
				buttonText: "Сохранить",
				buttonName: "saveBtn",
				buttonClass: "saveBtn",
			}).render(),
			...props,
		});
	}

	getEvents(): Record<string, any> {
		return this.events;
	}

	render(): string {
		return compile(template)(this.props);
	}
}
