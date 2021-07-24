import set from '../utils/set';
import get from '../utils/get';
import stringToObject from '../utils/stringToObject';
import isEqual from '../utils/isEqual';
import merge from '../utils/merge';
import EventBus from './EventBus';

class Store {
	protected eventBus: () => EventBus;

	protected state: Record<string, any>;

	protected event: string;

	constructor() {
		const eventBus = new EventBus();
		this.eventBus = () => eventBus;
		this.state = {};
	}

	init(event: string, action: Function) {
		this.event = event;
		this.eventBus().on(event, action);

		const test: Record<string, any> = this._makeStateProxy(
			stringToObject(event)
		);
		this.state = merge(this.state, test);
	}

	set(path: string, value: any) {
		set(this.state, path, value);
		console.log(this.state);
	}

	get(path: string) {
		return get(this.state, path);
	}

	private _makeStateProxy(
		state: Record<string, any>
	): Boolean | Record<string, any> {
		if (state) {
			const proxyData = new Proxy(state, {
				set: (target, prop: any, value) => {
					const oldProp = target[prop];
					target[prop] = value;
					const newProp = target[prop];

					if (!isEqual(oldProp, newProp)) {
						this.eventBus().emit(this.event);
					}

					return true;
				},
				deleteProperty: () => {
					throw new Error('Нет доступа!');
				},
			});

			return proxyData;
		}

		return false;
	}
}

export default new Store();
