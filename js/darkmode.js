var sun = document.getElementById("sun");
const body = document.querySelector("body");
const p = document.querySelector("div.mural > p");
const logintxt = document.getElementById("logintxt");
const noPostsMessage = document.getElementById("noPostsMessage");
const npet = document.getElementById("npet");
const currentPage = document.getElementById("currentPage");

document.addEventListener("DOMContentLoaded", function () {
  var darkModeEnabled = localStorage.getItem("darkModeEnabled");

  if (darkModeEnabled === "true") {
    enableDarkMode();
    sun.classList.toggle("night");
    
  }
});

sun.onclick = function () {
  sun.classList.toggle("night");
  var darkModeEnabled = localStorage.getItem("darkModeEnabled");

  if (darkModeEnabled === "true") {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
};

function enableDarkMode() {
  const h2Erro = document.getElementById("h2Erro");
  const pErro = document.getElementById("pErro");
  sun.classList.add("darkToggle");
  body.style.background = "#121212";
  body.style.transition = "0.6s";
  localStorage.setItem("darkModeEnabled", "true");
  if (p) {
    p.style.color = "#ffffff";
  }
  if (logintxt) {
    logintxt.style.color = "#ffffff";
  }
  if (currentPage) {
    currentPage.style.color = "#ffffff";
  }
  if (npet) {
    npet.style.color = "#ffffff";
  }
  if (h2Erro) {
    h2Erro.style.color = "#ffffff";
  }
  if (pErro) {
    pErro.style.color = "#ffffff";
  }
  if (noPostsMessage) {
    noPostsMessage.style.color = "#ffffff";
  }
}

function disableDarkMode() {
  const h2Erro = document.getElementById("h2Erro");
  const pErro = document.getElementById("pErro");
  sun.classList.remove("darkToggle");
  body.style.background = "#ffffff";
  body.style.transition = "0.6s";
  localStorage.setItem("darkModeEnabled", "false");
  if (p) {
    p.style.color = "#121212";
  }
  if (npet) {
    npet.style.color = "#121212";
  }
  if (h2Erro) {
    h2Erro.style.color = "#121212";
  }
  if (pErro) {
    pErro.style.color = "#121212";
  }
  if (logintxt) {
    logintxt.style.color = "#121212";
  }
  if (currentPage) {
    currentPage.style.color = "#121212";
  }
  if (noPostsMessage) {
    noPostsMessage.style.color = "#121212";
  }
}
