const registerButton = document.querySelector(".registerBtn");
const loginButton = document.querySelector(".loginButton");

registerButton.addEventListener("click", () => {
  window.location = "register.html";
});

loginButton.addEventListener("click", () => {
  const login = document.getElementsByName("login")[0].value;
  const password = document.getElementsByName("password")[0].value;

  console.log({ login, password });
});
