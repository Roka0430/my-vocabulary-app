const form = document.getElementById("setupForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  appStorage.setup.set(data);
  window.location.href = "/study/";
});
