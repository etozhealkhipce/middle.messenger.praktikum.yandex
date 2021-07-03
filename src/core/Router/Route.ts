import render from "../../services/render";

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

	render() {
		if (!this._block) {
			this._block = new this._blockClass();
			render(this._props.rootQuery, this._block);
		}
	}
}
