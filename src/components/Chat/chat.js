const deleteButton = document.querySelector(".header__delete");
const sendButton = document.querySelector(".type__button");
const profileButton = document.querySelector(".profile");

profileButton.addEventListener("click", () => {
  window.location = "./profile.html";
});

deleteButton.addEventListener("click", () => {
  confirm("Удалить пользователя?");
});

sendButton.addEventListener("click", () => {
  const typedMessage = document.getElementsByName("message")[0].value;
  console.log(typedMessage);
});
