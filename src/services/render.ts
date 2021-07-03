export default function render(root: string, block: any): void {
	const app = document.querySelector(root);
	if (!app) return;

	app.innerHTML = "";
	app.appendChild(block.getContent());

	const events = block.getEvents();

	if (events) {
		Object.keys(events).forEach((key) => {
			events[key]();
		});
	}
}
