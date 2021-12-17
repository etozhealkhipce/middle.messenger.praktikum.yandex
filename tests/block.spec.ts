import { expect } from 'chai';
import Block from '../src/core/Block';

let block: Block;

type Constructor = {
	tagName: string;
	rootQuery: string;
	props?: Record<string, any>;
	events?: Function;
	classes?: string[];
	selector?: string;
	children?: any[];
};

describe('Block', () => {
	beforeEach(() => {
		class TestBlock extends Block {
			constructor({
				tagName,
				props,
				events,
				classes,
				selector,
				rootQuery,
				children,
			}: Constructor) {
				super({
					tagName,
					props,
					classes,
					events,
					selector,
					rootQuery,
					children,
				});
			}

			render(): HTMLElement {
				return this.getContent();
			}
		}

		block = new TestBlock({
			tagName: 'div',
			rootQuery: 'test',
			classes: ['test'],
			events: () => 'test',
		});
	});

	it('Created element to equal "DIV"', () => {
		const element = block.getContent();
		expect(element.tagName).to.equal('DIV');
	});

	it('Created element class to equal "test"', () => {
		const element = block.getContent();
		expect(element.className).to.equal('test');
	});

	it('Component event function return "hello" string', () => {
		const events = block.getEvents();
		expect(events && events())
			.to.be.a('string')
			.and.to.equal('hello');
	});
});
