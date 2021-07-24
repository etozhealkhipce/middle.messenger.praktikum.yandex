import { compile } from 'pug';
import Block from '../../core/Block';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import './_profileCart.scss';
import events from './events';
import merge from '../../utils/merge';

// type Props = {
// 	edit: Boolean;
// 	changePassword: Boolean;
// };

const template: string = `
main.content-wrapper__content_profile
    form.profile-cart#profileForm
        .user
            if edit
                .user__first-wrapper.user__first-wrapper_edit
                    label(for="avatar-input").user__avatar-input
                        img().user__image
                    .avatar-wrapper
            else
                .user__first-wrapper
                    img().user__image

            .user__second-wrapper
                span.user__title Илья
                p.user__surname Фамилия
        

        if !changePassword
            label(for="login").label Логин
            .login-wrapper
            p.profile-cart__error.login-error.hidden Неверный логин
            label(for="email").label Почта
            .email-wrapper
            p.profile-cart__error.email-error.hidden Неверный формат email
            label(for="phone").label Телефон
            .phone-wrapper
            p.profile-cart__error.phone-error.hidden Неверный формат телефона
            if edit
                label(for="name").label Имя
                .name-wrapper
                label(for="surname").label Фамилия
                .surname-wrapper
        else
            label(for="password").label Пароль
            .password-wrapper
            p.profile-cart__error.password-error.hidden Неверный пароль 
            label(for="password-new").label Новый пароль
            .passwordNew-wrapper
            p.profile-cart__error.password-new-error.hidden Неверный пароль 
            label(for="password-new-repeat").label Повторение нового пароля
            .passwordNewRepeat-wrapper
            p.profile-cart__error.password-new-repeat-error.hidden Неверный пароль 
        
        .actions
            if !edit && !changePassword
                .actions__left
                    a.actions__link.profile-edit Изменить даннные
                    a.actions__link.profile-change-password Изменить пароль
                .actions__right
                    a.actions__link.logout Выйти
            else
                .saveBtn-wrapper
                a.actions__link.back Отмена
`;
export default class ProfileCart extends Block {
	events: Record<string, any>;

	constructor(parentData: any) {
		const data: any = merge(parentData, {
			tagName: 'template',
			children: [
				{
					component: Input,
					props: {
						inputType: 'file',
						inputId: 'avatar-input',
						inputName: 'avatar',
						inputPlaceholder: '',
						inputClass: 'profile-cart__input_file',
					},
					rootQuery: '.avatar-wrapper',
				},
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'login',
						inputName: 'login',
						inputValue: '',
						inputPlaceholder: 'Введите логин',
						inputClass: 'profile-cart__input',
						inputDisabled: !parentData?.props?.edit,
					},
					rootQuery: '.login-wrapper',
					selector: 'profileCart.login',
				},
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'email',
						inputName: 'email',
						inputValue: 'alkhipce@mail.ru',
						inputPlaceholder: 'Введите почту',
						inputClass: 'profile-cart__input',
						inputDisabled: !parentData?.props?.edit,
					},
					rootQuery: '.email-wrapper',
					selector: 'profileCart.email',
				},
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'phone',
						inputName: 'phone',
						inputValue: '+7 777 555 1234',
						inputPlaceholder: 'Введите телефон',
						inputClass: 'profile-cart__input',
						inputDisabled: !parentData?.props?.edit,
					},
					rootQuery: '.phone-wrapper',
				},
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'name',
						inputName: 'name',
						inputValue: 'Илья',
						inputPlaceholder: 'Введите имя',
						inputClass: 'profile-cart__input',
					},
					rootQuery: '.name-wrapper',
				},
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'surname',
						inputName: 'surname',
						inputPlaceholder: 'Введите фамилию',
						inputClass: 'profile-cart__input',
					},
					rootQuery: '.surname-wrapper',
				},
				{
					component: Input,
					props: {
						inputType: 'password',
						inputId: 'password',
						inputName: 'password',
						inputPlaceholder: 'Введите пароль',
						inputClass: 'profile-cart__input',
					},
					rootQuery: '.password-wrapper',
				},
				{
					component: Input,
					props: {
						inputType: 'password',
						inputId: 'password-new',
						inputName: 'password-new',
						inputPlaceholder: 'Введите новый пароль',
						inputClass: 'profile-cart__input',
					},
					rootQuery: '.passwordNew-wrapper',
				},
				{
					component: Input,
					props: {
						inputType: 'password',
						inputId: 'password-new-repeat',
						inputName: 'password-new-repeat',
						inputPlaceholder: 'Введите новый пароль еще раз',
						inputClass: 'profile-cart__input',
					},
					rootQuery: '.passwordNewRepeat-wrapper',
				},
				{
					component: Button,
					props: {
						buttonType: 'submit',
						buttonId: 'saveBtn',
						buttonText: 'Сохранить',
						buttonName: 'saveBtn',
						buttonClass: 'saveBtn',
					},
					rootQuery: '.saveBtn-wrapper',
				},
			],
			events,
		});

		super(data);
	}

	render(): string {
		return compile(template)(this.props);
	}
}
