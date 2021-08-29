import { render } from 'pug';
import Block from '../../core/Block';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { UserPreview } from '../ui/userPreview';
import './_sidebar.scss';
import events from './events';
import merge from '../../utils/merge';

const template: string = `
aside.sidebar
	.search
		.search-input-wrapper
	.user-preview-wrapper
	.profile-button-wrapper`;

export default class Sidebar extends Block {
	constructor(parentData: any) {
		const data: any = merge(parentData, {
			tagName: 'template',
			children: [
				{
					component: Input,
					props: {
						inputType: 'text',
						inputId: 'search',
						inputName: 'search',
						inputPlaceholder: 'Поиск',
						inputClass: 'search__input',
					},
					rootQuery: '.search-input-wrapper',
				},
				{
					component: Button,
					props: {
						buttonType: 'button',
						buttonId: 'profileBtn',
						buttonText: 'Профиль',
						buttonName: 'profileBtn',
						buttonClass: 'profile',
					},
					rootQuery: '.profile-button-wrapper',
				},
				{
					component: UserPreview,
					props: { chats: parentData.chats, users: parentData.users },
					rootQuery: '.user-preview-wrapper',
					selector: 'sidebar-data',
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
