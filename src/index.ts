import render from "./services/render";
import "./styles/index.scss";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import InactiveMessenger from "./pages/InactiveMessenger";
import ActiveMessenger from "./pages/ActiveMessenger";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

let path: string | null = null;
if (window) {
	path = window.location.pathname;
} else {
	render("#app", new SignIn());
}

switch (path) {
	case "/":
		render("#app", new SignIn());
		break;
	case "/register":
		render("#app", new SignUp());
		break;
	case "/inactivechat":
		render("#app", new InactiveMessenger());
		break;
	case "/activechat":
		render("#app", new ActiveMessenger());
		break;
	case "/profile":
		render("#app", new Profile({ edit: false, changePassword: false }));
		break;
	case "/profile-edit":
		render("#app", new Profile({ edit: true, changePassword: false }));
		break;
	case "/profile-change-password":
		render("#app", new Profile({ edit: false, changePassword: true }));
		break;
	case "/error":
		render("#app", new Error({ errorCode: 404 }));
		break;

	default:
		break;
}
