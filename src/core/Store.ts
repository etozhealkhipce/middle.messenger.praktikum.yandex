import set from '../utils/set';
import get from '../utils/get';
import EventBus from './EventBus';

// TODO: сделать стор общим и добавить мемоизацию
class Store {
	protected eventBus: () => EventBus;

	protected state: Record<string, any>;

	static EVENTS = {
		UPDATED: 'store:updated',
	};

	constructor(state: any) {
		const eventBus = new EventBus();
		this.eventBus = () => eventBus;
		this.state = this._makeStateProxy(state);
	}

	init(action: Function) {
		this.eventBus().on(Store.EVENTS.UPDATED, action);
	}

	set(path: string, value: any) {
		set(this.state, path, value);
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

					// TODO: при рефакторинге добавить глубокое сравнение
					if (oldProp !== newProp) {
						this.eventBus().emit(Store.EVENTS.UPDATED);
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

export default Store;
