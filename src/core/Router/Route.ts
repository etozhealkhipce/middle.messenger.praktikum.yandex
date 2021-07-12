import render from '../../services/render';

function isEqual(lhs: string, rhs: string) {
	return lhs === rhs;
}

export default class Route {
	protected _pathname: string;

	protected _blockClass: any;

	protected _block: Function | null;

	protected _props: Record<string, any>;

	constructor(pathname: string, view: any, props: Record<string, any>) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	match(pathname: string) {
		return isEqual(pathname, this._pathname);
	}

	render(props?: Record<string, any>) {
		if (props) {
			this._props = Object.assign(this._props, props);
		}

		this._block = new this._blockClass(this._props);
		render(this._props.rootQuery, this._block);
	}
}
