import { router } from '../../index';

export default function () {
	const backButton = <HTMLButtonElement>document.getElementById('backButton');

	if (backButton) {
		backButton.addEventListener('click', (): void => {
			router.back();
		});
	}
}
