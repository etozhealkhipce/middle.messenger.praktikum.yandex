import { compile } from 'pug';
import Block from '../core/Block';
import { ErrorMessage } from '../components/ErrorMessage';

const template: string = `
main.error`;

export default class Error extends Block {
	constructor(props: any) {
		super({
			tagName: 'template',
			children: [
				{
					component: ErrorMessage,
					rootQuery: '.error',
					props: {
						errorCode: 404,
					},
				},
			],
			...props,
		});
	}

	render(): string {
		return compile(template)(this.props);
	}
}
