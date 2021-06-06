const saveButton = document.querySelector(".saveButton");

if (saveButton) {
  saveButton.addEventListener("click", () => {
    const login = document.getElementsByName("login")[0];
    const password = document.getElementsByName("password")[0];
    const passwordNew = document.getElementsByName("password-new")[0];
    const passwordNewRepeat = document.getElementsByName(
      "password-new-repeat"
    )[0];
    const avatar = document.getElementsByName("avatar")[0];
    const email = document.getElementsByName("email")[0];
    const phone = document.getElementsByName("phone")[0];
    const name = document.getElementsByName("name")[0];
    const surname = document.getElementsByName("surname")[0];

    const arr = [
      login,
      password,
      avatar,
      email,
      phone,
      name,
      surname,
      passwordNew,
      passwordNewRepeat,
    ].map((item) => {
      if (item) {
        return item.value;
      }
    });

    console.log({ ...arr });
  });
}
