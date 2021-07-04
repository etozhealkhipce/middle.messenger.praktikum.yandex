import Router from "./core/Router/Router";
import "./styles/index.scss";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import InactiveMessenger from "./pages/InactiveMessenger";
import ActiveMessenger from "./pages/ActiveMessenger";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

export const router = new Router("#app");

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

router
	.use(Paths.index, SignIn)
	.use(Paths.register, SignUp)
	.use(Paths.inactivechat, InactiveMessenger)
	.use(Paths.activechat, ActiveMessenger)
	.use(Paths.profile, Profile)
	.use(Paths.error, Error)
	.start();
