import { compile } from 'pug';
import EventBus from './EventBus';
import merge from '../utils/merge';

type Constructor = {
	template: string;
	tagName: string;
	props: Record<string, any>;
	events?: Record<string, any>;
	classes?: string[];
	store?: any;
};

class Block {
	events: any;

	props: any;

	classes?: string[];

	template: string;

	store: any;

	protected eventBus: () => EventBus;

	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	_element: HTMLElement;

	_meta: Constructor;

	constructor({
		template,
		tagName,
		props,
		events,
		classes,
		store,
	}: Constructor) {
		const eventBus = new EventBus();
		this._meta = {
			tagName,
			template,
			props,
			events,
			classes,
			store,
		};

		this.events = events;
		this.template = template;
		this.classes = classes;
		this.props = this._makePropsProxy(props);
		this.store = store;

		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);

		eventBus.emit(Block.EVENTS.INIT);
	}

	private _registerEvents(eventBus: EventBus): void {
		if (this.store) {
			this.store.init(this._updateState.bind(this));
		}
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

	private _updateState() {
		// this.props = merge(this.props, this.store.state);
		this._componentDidMount();
	}

	get element() {
		return this._element;
	}

	private _render(): void {
		const block = compile(this.template)(this.props);

		this._element.innerHTML = block;

		this.render();
	}

	render() {}

	getContent() {
		return this.element.innerHTML;
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
					console.log(target, prop);
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
