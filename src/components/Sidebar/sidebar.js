const sidebar = document.querySelector(".sidebar");
const profileButton = document.querySelector(".profile");

profileButton.addEventListener("click", () => {
  window.location = "./profile.html";
});

sidebar.addEventListener("click", (e) => {
  if (e.target.closest(".user-preview")) {
    document.location.href = "./chat.html";
  }
});
