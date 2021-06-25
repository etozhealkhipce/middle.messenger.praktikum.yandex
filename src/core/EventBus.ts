class EventBus {
	protected listeners: Record<string, any>;

	constructor() {
		this.listeners = {};
	}

	on(event: string, callback: any): void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	off(event: string, callback: any): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			(listener: Record<string, any>) => listener !== callback
		);
	}

	emit(event: string, ...args: any): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event].forEach((listener) => {
			listener(...args);
		});
	}
}

export default EventBus;
