const registerButton = document.querySelector(".registerBtn");

registerButton.addEventListener("click", () => {
  const email = document.getElementsByName("email")[0].value;
  const login = document.getElementsByName("login")[0].value;
  const name = document.getElementsByName("name")[0].value;
  const surname = document.getElementsByName("surname")[0].value;
  const phone = document.getElementsByName("phone")[0].value;
  const passwordRepeat = document.getElementsByName("password-repeat")[0].value;

  console.log({ email, login, name, surname, phone, passwordRepeat });
});
