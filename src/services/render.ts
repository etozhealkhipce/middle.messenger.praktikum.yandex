export default function render(root: string, block: any) {
	const app = document.querySelector(root);
	if (app) {
		app.appendChild(block.getContent());

		const events = block.getEvents();
		if (events) {
			Object.keys(events).forEach((key) => {
				events[key]();
			});
		}
	}
	return app;
}
