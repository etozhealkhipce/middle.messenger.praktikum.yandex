import Route from './Route';

class Router {
	protected _currentRoute: any;

	protected _rootQuery: string;

	routes: Record<string, any>;

	history: any;

	constructor(rootQuery: string) {
		if ((Router as any).__instance) {
			return (Router as any).__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;

		(Router as any).__instance = this;
	}

	use(pathname: string, block: any, params?: any) {
		const route = new Route(pathname, block, {
			rootQuery: this._rootQuery,
			...params,
		});
		this.routes.push(route);

		return this;
	}

	start() {
		window.onpopstate = (event: any) => {
			this._onRoute(event.currentTarget.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string, params?: Record<string, any>) {
		const route = this.getRoute(pathname) || this.getRoute('/error');

		route.render(params);

		this._currentRoute = route;
	}

	go(pathname: string, params?: Record<string, any>) {
		this.history.pushState({}, '', pathname);
		this._onRoute(pathname, params);
	}

	back() {
		this.history.back();
	}

	forward() {
		this.history.forward();
	}

	getRoute(pathname: string) {
		return this.routes.find((route: any) => route.match(pathname));
	}
}

export default new Router('#app');
