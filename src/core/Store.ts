import set from '../utils/set';
import get from '../utils/get';
import EventBus from './EventBus';

class Store {
	private eventBus: () => EventBus;

	private events: any = {};

	private state: Record<string, any>;

	constructor() {
		const eventBus = new EventBus();
		this.eventBus = () => eventBus;
		this.state = {};
	}

	init(event: string, action: Function) {
		this.events[event] = event;
		this.eventBus().on(event, action);
		this.state[event] = {};
	}

	set(path: string, value: any) {
		set(this.state, path, value);
		// eslint-disable-next-line no-prototype-builtins
		if (this.events.hasOwnProperty(path)) {
			this.eventBus().emit(this.events[path]);
		}
	}

	get(path: string) {
		return get(this.state, path);
	}
}

export default new Store();
