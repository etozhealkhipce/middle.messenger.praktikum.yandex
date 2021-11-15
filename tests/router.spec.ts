import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Router from '../src/core/Router/Router';
import Block from '../src/core/Block';

let router: typeof Router;

declare global {
	namespace NodeJS {
		interface Global {
			document: Document;
			// TODO: разобраться почему не работает Window
			window: any;
			navigator: Navigator;
		}
	}
}

const { window } = new JSDOM(
	'<!doctype html><html><body><div id="app"></div></body></html>',
	{ url: 'http://localhost' }
);

global.window = window;
global.document = window.document;

class TestComponent extends Block {
	constructor(props: any) {
		super({
			tagName: 'template',
			...props,
			events: {},
		});
	}

	render(): string {
		return this.props.text;
	}
}

describe('Router', () => {
	beforeEach(() => {
		router = Router;

		Object.defineProperty(window, 'location', {
			value: {
				pathname: '/first',
			},
		});
	});

	it('Use and start router', () => {
		router
			.use('/first', TestComponent, {
				props: {
					text: 'first',
				},
			})
			.start();

		const app = document.getElementById('app');
		expect(app?.textContent).to.equal('first');
	});

	it('Go to new page', () => {
		router.use('/first', TestComponent, {
			props: {
				text: 'first',
			},
		});
		router
			.use('/second', TestComponent, {
				props: {
					text: 'second',
				},
			})
			.start();

		router.go('/second');

		const app = document.getElementById('app');
		expect(app?.textContent).to.equal('second');
	});
});
