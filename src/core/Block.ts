import EventBus from './EventBus';

type Constructor = {
	tagName: string;
	props: Record<string, any>;
	events?: Record<string, any> | undefined;
	classes?: string[];
};

class Block {
	events: any;

	props: any;

	classes?: string[];

	protected eventBus: () => EventBus;

	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	_element: HTMLElement;

	_meta: Constructor;

	constructor({ tagName, props, events, classes }: Constructor) {
		const eventBus = new EventBus();
		this._meta = {
			tagName,
			props,
			events,
			classes,
		};

		this.events = events;
		this.classes = classes;
		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	private _registerEvents(eventBus: EventBus): void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources(): void {
		const { tagName } = this._meta;
		const element = this._createDocumentElement(tagName);
		if (this.classes) {
			element.classList.add(...this.classes);
		}
		this._element = element;
	}

	init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidMount(): void {
		this.componentDidMount();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	componentDidMount() {}

	private _componentDidUpdate(): void {
		const response = this.componentDidUpdate();
		if (response) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	componentDidUpdate(): Boolean {
		return true;
	}

	get element() {
		return this._element;
	}

	private _render(): void {
		const block = this.render();

		this._element.innerHTML = block;

		if (this._element.content) {
			this._element = this._element.content.cloneNode(true);
		}
	}

	render() {}

	getContent() {
		return this.element;
	}

	getEvents() {
		return this.events;
	}

	private _makePropsProxy(
		props: Record<string, any>
	): Boolean | Record<string, any> {
		if (props) {
			const proxyData = new Proxy(props, {
				set: (target, prop: any, value) => {
					const oldProp = target[prop];
					target[prop] = value;
					const newProp = target[prop];

					this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProp, newProp);
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

	private _createDocumentElement(tagName: string): HTMLElement {
		return document.createElement(tagName);
	}
}

export default Block;
