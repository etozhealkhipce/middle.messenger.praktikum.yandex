import Router from '../../core/Router/Router';

export default function () {
	const backButton = <HTMLButtonElement>document.getElementById('backButton');

	if (backButton) {
		backButton.addEventListener('click', (): void => {
			Router.go('/');
		});
	}
}
