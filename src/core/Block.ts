import EventBus from './EventBus';
import Store from './Store';
import merge from '../utils/merge';
import render from '../services/render';

type Constructor = {
	tagName: string;
	rootQuery: string;
	props?: Record<string, any>;
	events?: Function;
	classes?: string[];
	selector?: string;
	children?: any[];
};

class Block {
	props: any;

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
		tagName,
		props,
		events,
		classes,
		selector,
		rootQuery,
		children,
	}: Constructor) {
		const eventBus = new EventBus();
		this._meta = {
			tagName,
			props,
			events,
			classes,
			selector,
			rootQuery,
			children,
		};

		this.props = this._makePropsProxy(props || {});

		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);

		eventBus.emit(Block.EVENTS.INIT);
	}

	private _registerEvents(eventBus: EventBus): void {
		if (this._meta.selector) {
			Store.init(this._meta.selector, this._updateState.bind(this));
		}
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources(): void {
		const { tagName, classes } = this._meta;
		const element = this._createDocumentElement(tagName);
		if (classes) {
			element.classList.add(...classes);
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
		const { selector } = this._meta;
		if (selector) {
			const nextProps = Store.get(selector);
			this.setProps(nextProps);
		}
	}

	setProps(nextProps: any) {
		if (!nextProps) {
			return;
		}

		merge(this.props, nextProps);
	}

	get element() {
		return this._element;
	}

	private _render(): void {
		const block: any = this.render();
		const { rootQuery, children, events } = this._meta;

		// TODO: подумать как можно убрать обертку над динамическими элементами в темплейте
		// TODO: возможно использовать Shadow DOM
		render(rootQuery, block);

		if (children && children.length) {
			children.map((item) => {
				const { component } = item;
				// eslint-disable-next-line new-cap
				return new component({
					tagName: item.tagName,
					props: item.props,
					events: item.events,
					classes: item.classes,
					selector: item.selector,
					rootQuery: item.rootQuery,
					children: item.children,
				});
			});
		}

		// TODO: добавить уникальные события на каждый компонент
		if (events) {
			events();
		}
	}

	render() {}

	getContent() {
		return this.element;
	}

	getEvents() {
		return this._meta.events;
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
