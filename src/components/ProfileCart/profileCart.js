const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const obj = {
		login: document.getElementById("login"),
		password: document.getElementById("password"),
		passwordNew: document.getElementById("password-new"),
		passwordNewRepeat: document.getElementById("password-new-repeat"),
		avatar: document.getElementById("avatar"),
		email: document.getElementById("email"),
		phone: document.getElementById("phone"),
		name: document.getElementById("name"),
		surname: document.getElementById("surname"),
	};

	const request = Object.entries(obj).reduce((acc, [key, elem]) => {
		if (elem && elem.value) {
			acc[key] = elem.value;
		}

		return acc;
	}, {});

	console.log(request);
});
