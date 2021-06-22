const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const response = {
		email: document.getElementById("email").value,
		login: document.getElementById("login").value,
		name: document.getElementById("name").value,
		surname: document.getElementById("surname").value,
		phone: document.getElementById("phone").value,
		passwordRepeat: document.getElementById("password-repeat").value,
	};

	console.log(response);
});
