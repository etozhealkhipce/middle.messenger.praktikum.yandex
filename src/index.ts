import render from "./services/render";
import "./styles/index.scss";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import InactiveMessenger from "./pages/InactiveMessenger";
import ActiveMessenger from "./pages/ActiveMessenger";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

const enum Paths {
	index = "/",
	register = "/register",
	inactivechat = "/inactivechat",
	activechat = "/activechat",
	profile = "/profile",
	profileEdit = "/profile-edit",
	profileChangePassword = "/profile-change-password",
	error = "/error",
}

const path: string = window.location.pathname;

switch (path) {
	case Paths.index:
		render("#app", new SignIn());
		break;
	case Paths.register:
		render("#app", new SignUp());
		break;
	case Paths.inactivechat:
		render("#app", new InactiveMessenger());
		break;
	case Paths.activechat:
		render("#app", new ActiveMessenger());
		break;
	case Paths.profile:
		render("#app", new Profile({ edit: false, changePassword: false }));
		break;
	case Paths.profileEdit:
		render("#app", new Profile({ edit: true, changePassword: false }));
		break;
	case Paths.profileChangePassword:
		render("#app", new Profile({ edit: false, changePassword: true }));
		break;
	case Paths.error:
		render("#app", new Error({ errorCode: 404 }));
		break;

	default:
		break;
}
