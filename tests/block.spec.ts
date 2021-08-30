import { expect } from 'chai';
import Block from '../src/core/Block';

let block: Block;

describe('Block', () => {
	beforeEach(() => {
		class TestBlock extends Block {
			constructor(
				props: Record<string, any>,
				classes: string[],
				events: Record<string, Function>
			) {
				super({
					tagName: 'div',
					props,
					classes,
					events,
				});
			}

			render(): HTMLElement {
				return this.getContent();
			}
		}

		block = new TestBlock({ text: 'test' }, ['test'], { test: () => 'hello' });
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
		expect(events.test()).to.be.a('string').and.to.equal('hello');
	});
});
