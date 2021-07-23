export default function render(root: string, block: string): void {
	const app: HTMLElement | null = document.querySelector(root);

	if (!app) return;

	app.innerHTML = block;
}
