import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import render from '../src/services/render';

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

describe('Render ', () => {
	const blockMock = {
		getContent: () => {
			const p = document.createElement('p');
			p.textContent = 'hello';
			return p;
		},
		getEvents: () => null,
	};

	it('Render "p" tag with "hello" content in #app', () => {
		render('#app', blockMock);
		const p = document.getElementById('app')?.getElementsByTagName('p')[0];
		expect(p?.textContent).to.equal('hello');
	});
});
