const registerButton = document.getElementById("registerBtn");
const loginButton = document.getElementById("loginBtn");

registerButton.addEventListener("click", () => {
  window.location = "./register.html";
});

loginButton.addEventListener("click", () => {
  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;

  console.log({ login, password });
});
