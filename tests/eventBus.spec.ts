import { expect } from 'chai';
import EventBus from '../src/core/EventBus';

let eventBus: EventBus;
let text: string | null;

describe('EventBus', () => {
	eventBus = new EventBus();

	function setHello() {
		text = 'hello';
	}

	beforeEach(() => {
		text = null;
	});

	it('On and emit event', () => {
		eventBus.on('test', setHello);
		eventBus.emit('test');

		expect(text).to.be.a('string').and.to.equal('hello');
	});

	it('Off event', () => {
		eventBus.off('test', setHello);
		eventBus.emit('test');

		expect(text).to.be.a('null');
	});
});
