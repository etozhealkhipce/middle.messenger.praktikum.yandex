import Router from './core/Router/Router';
import './styles/index.scss';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Messenger from './pages/Messenger';
import Profile from './pages/Profile';
import Error from './pages/Error';

enum Paths {
	index = '/',
	register = '/sign-up',
	messenger = '/messenger',
	settings = '/settings',
	error = '/error',
}

Router.guard = (to: string) => {
	switch (to) {
		case Paths.index:
		case Paths.register:
			return (() => ({
				access: !localStorage.getItem('login'),
				redirect: Paths.messenger,
			}))();
		case Paths.messenger:
		case Paths.settings:
			return (() => ({
				access: !!localStorage.getItem('login'),
				redirect: Paths.index,
			}))();

		default:
			return true;
	}
};

Router.use(Paths.index, SignIn)
	.use(Paths.register, SignUp)
	.use(Paths.messenger, Messenger)
	.use(Paths.settings, Profile)
	.use(Paths.error, Error)
	.start();
