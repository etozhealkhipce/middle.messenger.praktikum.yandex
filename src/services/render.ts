export default function render(query: string, block: any) {
	const app = document.querySelector(query);
	if (app) {
		console.log(block);
		app.appendChild(block.getContent());
	}
	return app;
}
