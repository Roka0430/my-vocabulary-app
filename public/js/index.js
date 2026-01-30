const errorMessage = document.getElementById("errorMessage");
const urlParams = new URLSearchParams(window.location.search);
switch (urlParams.get("error")) {
  case "empty":
    errorMessage.textContent = "パスワードを入力してください";
    break;
  case "wrong":
    errorMessage.textContent = "パスワードが異なります";
    break;
}
