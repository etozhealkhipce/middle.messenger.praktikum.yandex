import { compile } from 'pug';
import Block from '../../core/Block';
import { Button } from '../ui/Button';
import './_error.scss';
import events from './events';
import merge from '../../utils/merge';

// type Props = {
// 	errorCode: string | number;
// };

const template: string = `
.error-cart
    h1.error-cart__title=errorCode
    p.error-message Страница не существует
    .backButton-wrapper`;

export default class ErrorMessage extends Block {
	constructor(parentData: any) {
		console.log(parentData);

		const data: any = merge(parentData, {
			tagName: 'template',
			children: [
				{
					component: Button,
					props: {
						buttonType: 'button',
						buttonId: 'backButton',
						buttonText: 'Вернуться',
						buttonName: 'backButton',
						buttonClass: 'error-cart__button back',
					},
					rootQuery: '.backButton-wrapper',
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
