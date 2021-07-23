import set from '../utils/set';
import get from '../utils/get';
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
		this.state[event] = this._makeStateProxy({});
	}

	set(path: string, value: any) {
		set(this.state, path, value);
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
				set: (target, prop: any, value, receiver) => {
					// const oldProp = target[prop];
					target[prop] = value;
					// const newProp = target[prop];

					// TODO: при рефакторинге добавить глубокое сравнение
					console.log('обновился стейт', receiver);

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
