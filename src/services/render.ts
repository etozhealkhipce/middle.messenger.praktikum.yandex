export default function render(root: string, block: any) {
	const app = document.querySelector(root);
	if (app) {
		app.appendChild(block.getContent());

		const events = block.getEvents();
		if (events) {
			Object.keys(events).forEach((key) => {
				if (typeof events[key] === "function") {
					events[key]();
				}
			});
		}
	}
	return app;
}
