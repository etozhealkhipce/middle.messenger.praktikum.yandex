const deleteButton = document.getElementById("deleteBtn");
const sendButton = document.getElementById("sendMessageButton");
const profileButton = document.getElementById("profileBtn");

profileButton.addEventListener("click", () => {
  window.location = "./profile.html";
});

deleteButton.addEventListener("click", () => {
  confirm("Удалить пользователя?");
});

sendButton.addEventListener("click", () => {
  const typedMessage = document.getElementById("messageInput").value;
  console.log({
    typedMessage,
  });
});
