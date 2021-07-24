import merge from '../../utils/merge';

function isEqual(lhs: string, rhs: string) {
	return lhs === rhs;
}

export default class Route {
	protected _pathname: string;

	protected _blockClass: any;

	protected _block: Function | null;

	protected _params: Record<string, any>;

	constructor(pathname: string, view: any, params: Record<string, any>) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._params = params;
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

	render(params?: Record<string, any>) {
		if (params) {
			this._params = merge(this._params, params);
		}

		this._block = new this._blockClass(this._params);
	}
}
