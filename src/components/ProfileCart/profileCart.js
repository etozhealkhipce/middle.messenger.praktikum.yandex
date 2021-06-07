const saveButton = document.getElementById("saveBtn");

if (saveButton) {
  saveButton.addEventListener("click", () => {
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

    const request = Object.entries(obj).reduce((acc, val) => {
      if (val[1] && val[1].value) {
        acc[val[0]] = val[1].value;
      }

      return acc;
    }, {});

    console.log(request);
  });
}
