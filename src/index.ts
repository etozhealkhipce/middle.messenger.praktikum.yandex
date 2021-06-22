import render from "./services/render";
import "./styles/index.scss";
// import InactiveMessenger from "./pages/InactiveMessenger";
// import ActiveMessenger from "./pages/ActiveMessenger";
// import Error from "./pages/Error";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// render("#app", new Error({ errorCode: 404 }));
import Profile from "./pages/Profile";

render("#app", new Profile({ edit: false, changePassword: true }));
