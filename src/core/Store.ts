import set from '../utils/set';
import get from '../utils/get';
import stringToObject from '../utils/stringToObject';
// import isEqual from '../utils/isEqual';
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

		const test = stringToObject(event);
		const acc = this.state.hasOwnProperty(Object.keys(test)[0])
			? this.state[Object.keys(test)[0]]
			: {};

		this.state = Object.entries(test).reduce(
			(acc, [key, val]) => (acc[key] = this._makeStateProxy(val)),
			acc
		);

		console.log(this.state);
	}

	set(path: string, value: any) {
		set(this.state, path, value);
		console.log(this.state);
	}

	get(path: string) {
		// TODO: добавить мемоизацию
		return get(this.state, path);
	}

	private _makeStateProxy(
		state: Record<string, any>
	): Boolean | Record<string, any> {
		if (state) {
			const proxyData = new Proxy(state, {
				set: (target, prop: any, value) => {
					target[prop] = value;

					this.eventBus().emit(this.event);

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
