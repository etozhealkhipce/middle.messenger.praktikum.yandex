import Store from '../../../core/Store';
import cloneDeep from '../../../utils/cloneDeep';

export default function () {
	const addWrapper = <HTMLElement>document.querySelector('.add');
	const removeWrapper = <HTMLElement>document.querySelector('.remove');

	if (addWrapper && !removeWrapper) {
		addWrapper.addEventListener('click', (e: Event) => {
			const target = e.target as HTMLButtonElement;
			e.stopImmediatePropagation();

			const add = target.matches('#addUser');
			const remove = target.matches('#removeUser');

			if (!add && !remove) return;
			const { user } = target.dataset;
			const added = Array.isArray(Store.get('added-user')?.users)
				? Store.get('added-user').users
				: [];

			if (
				add &&
				user &&
				added.findIndex(
					(i: Record<string, any>) => i.id === JSON.parse(user).id
				) === -1
			) {
				Store.set('added-user', {
					users: [...added, JSON.parse(user)],
				});
			}

			if (!remove && !user) return;

			let idx;

			if (user) {
				idx = added.findIndex(
					(i: Record<string, any>) => i.id === JSON.parse(user).id
				);
			}

			if (idx === -1) return;
			const cloned = cloneDeep(added);
			cloned.splice(idx, 1);

			Store.set('added-user', {
				users: cloned,
			});
		});
	}

	if (removeWrapper && !addWrapper) {
		removeWrapper.addEventListener('click', (e: Event) => {
			const target = e.target as HTMLButtonElement;
			e.stopImmediatePropagation();

			const add = target.matches('#addUser');
			const remove = target.matches('#removeUser');

			if (!add && !remove) return;
			const { user } = target.dataset;
			const added = Array.isArray(Store.get('remove-users')?.users)
				? Store.get('remove-users').users
				: [];

			if (
				add &&
				user &&
				added.findIndex(
					(i: Record<string, any>) => i.id === JSON.parse(user).id
				) === -1
			) {
				Store.set('remove-users', {
					users: [...added, JSON.parse(user)],
				});
			}

			if (!remove && !user) return;
			let idx;

			if (user) {
				idx = added.findIndex(
					(i: Record<string, any>) => i.id === JSON.parse(user).id
				);
			}

			if (idx === -1) return;
			const cloned = cloneDeep(added);
			cloned.splice(idx, 1);

			Store.set('remove-users', {
				users: cloned,
			});
		});
	}
}
