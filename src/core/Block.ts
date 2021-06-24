import EventBus from "./EventBus";

class Block {
	protected props: Record<string, any>;

	protected events: Record<string, Function>;

	protected eventBus: () => EventBus;

	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
	};

	_element = null;

	_meta = null;

	constructor(tagName = "div", props = {}, events?: Record<string, Function>) {
		const eventBus = new EventBus();
		this._meta = {
			tagName,
			props,
			events,
		};

		this.events = events;
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
		this._element = this._createDocumentElement(tagName);
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

	setProps = (nextProps): undefined => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

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
		props: Record<symbol, any>
	): Boolean | Record<string, any> {
		const proxyData = new Proxy(props, {
			set: (target, prop, value) => {
				const oldProp = target[prop];
				target[prop] = value;
				const newProp = target[prop];

				this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProp, newProp);
				return true;
			},
			deleteProperty: () => {
				throw new Error("Нет доступа!");
			},
		});

		return proxyData;
	}

	private _createDocumentElement(tagName: string): HTMLElement {
		return document.createElement(tagName);
	}

	show() {
		this.getContent().style.display = "block";
	}

	hidden() {
		this.getContent().style.display = "none";
	}
}

export default Block;
