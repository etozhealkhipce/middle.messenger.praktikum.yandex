import Store from '../../../core/Store';
import cloneDeep from '../../../utils/cloneDeep';

export default function () {
	const addWrapper = <HTMLElement>document.querySelector('.add');
	const removeWrapper = <HTMLElement>document.querySelector('.remove');

	if (addWrapper) {
		addWrapper.addEventListener('click', (e: Event) => {
			e.stopImmediatePropagation();

			const add = e.target.matches('#addUser');
			const remove = e.target.matches('#removeUser');

			if (!add && !remove) return;
			const { user } = e.target.dataset;
			const added = Array.isArray(Store.get('added-user')?.users)
				? Store.get('added-user').users
				: [];

			if (add) {
				if (
					user &&
					added.findIndex(
						(i: Record<string, any>) => i.id === JSON.parse(user).id
					) === -1
				) {
					Store.set('added-user', {
						users: [...added, JSON.parse(user)],
					});
				}
			}

			if (!remove && !user) return;
			const idx = added.findIndex(
				(i: Record<string, any>) => i.id === JSON.parse(user).id
			);

			if (idx === -1) return;
			const cloned = cloneDeep(added);
			cloned.splice(idx, 1);

			Store.set('added-user', {
				users: cloned,
			});
		});
	}

	if (removeWrapper) {
		removeWrapper.addEventListener('click', (e: Event) => {
			e.stopImmediatePropagation();

			const add = e.target.matches('#addUser');
			const remove = e.target.matches('#removeUser');

			if (!add && !remove) return;

			const { user } = e.target.dataset;
			const added = Array.isArray(Store.get('remove-users')?.users)
				? Store.get('remove-users').users
				: [];

			if (add) {
				if (
					user &&
					added.findIndex(
						(i: Record<string, any>) => i.id === JSON.parse(user).id
					) === -1
				) {
					Store.set('remove-users', {
						users: [...added, JSON.parse(user)],
					});
				}
			}

			if (remove) {
				if (user) {
					const idx = added.findIndex(
						(i: Record<string, any>) => i.id === JSON.parse(user).id
					);

					if (idx !== -1) {
						const cloned = cloneDeep(added);
						cloned.splice(idx, 1);

						Store.set('remove-users', {
							users: cloned,
						});
					}
				}
			}
		});
	}
}
