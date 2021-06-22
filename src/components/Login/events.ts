export default function () {
	const registerButton = document.getElementById("registerBtn");
	const loginForm = document.getElementById("loginForm");

	registerButton.addEventListener("click", () => {
		window.location = "./register";
	});

	loginForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const login = document.getElementById("login").value;
		const password = document.getElementById("password").value;

		console.log({ login, password });
	});
}
