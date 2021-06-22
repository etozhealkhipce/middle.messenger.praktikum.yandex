import EventBus from "./EventBus";

class Block {
	protected props: Record<string, any>;

	protected eventBus: () => EventBus;

	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
	};

	_element = null;

	_meta = null;

	constructor(tagName = "div", props = {}) {
		const eventBus = new EventBus();
		this._meta = {
			tagName,
			props,
		};

		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	private _registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources() {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidMount() {
		this.componentDidMount();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	componentDidMount() {}

	private _componentDidUpdate() {
		const response = this.componentDidUpdate();
		if (response) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	componentDidUpdate() {
		return true;
	}

	setProps = (nextProps) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	private _render() {
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

	private _makePropsProxy(props: object) {
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

	private _createDocumentElement(tagName: string) {
		return document.createElement(tagName);
	}

	show() {
		this.getContent().style.display = "block";
	}

	hide() {
		this.getContent().style.display = "none";
	}
}

export default Block;
