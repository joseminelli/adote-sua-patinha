var sun = document.getElementById("sun"),
transitionTime = 0.6;
const body = document.querySelector("body");
 p = document.querySelector("div.mural > p"),
 h1Sobre = document.querySelector("section#formm > h1"),
 h2Sobre = document.querySelector("section#faq  > h2"),
 logintxt = document.getElementById("logintxt"),
 noPostsMessage = document.getElementById("noPostsMessage"),
 npet = document.getElementById("npet"),
 iconProcura = document.getElementById("searchButton"),
 inputProcura = document.getElementById("searchInput"),
 currentPage = document.getElementById("currentPage"),
 pictureInput = document.getElementById("picture");

document.addEventListener("DOMContentLoaded", function () {
  var darkModeEnabled = localStorage.getItem("darkModeEnabled");

  if (darkModeEnabled === "true") {
    transitionTime = 0;
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
  body.style.background = "#282828";
  body.style.transition = transitionTime + "s";
  localStorage.setItem("darkModeEnabled", "true");
  if (p) {
    p.style.color = "#ffffff";
  }
  if(iconProcura){
    iconProcura.style.color = "#ffffff";
  }
  if(inputProcura){
    inputProcura.style.color = "#ffffff";
  }
  if(h1Sobre){
    h1Sobre.style.color = "#ffffff";
  }
  if(h2Sobre){
    h2Sobre.style.color = "#ffffff";
  }
  if(pictureInput){
    pictureInput.style.transition = transitionTime + "s";
    pictureInput.style.backgroundColor = "#353535";
    pictureInput.style.borderColor = "#fff";
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
  transitionTime = 0.6;
}

function disableDarkMode() {
  const h2Erro = document.getElementById("h2Erro");
  const pErro = document.getElementById("pErro");
  sun.classList.remove("darkToggle");
  body.style.background = "#ffffff";
  body.style.transition = transitionTime + "s";
  localStorage.setItem("darkModeEnabled", "false");
  if (p) {
    p.style.color = "#282828";
  }
  if(pictureInput){
    pictureInput.style.transition = transitionTime + "s";
    pictureInput.style.backgroundColor = "#ddd";
    pictureInput.style.borderColor = "#9e9e9e";
  }
  if(iconProcura){
    iconProcura.style.color = "#282828";
  }
  if(inputProcura){
    inputProcura.style.color = "#282828";
  }
  if(h1Sobre){
    h1Sobre.style.color = "#282828";
  }
  if(h2Sobre){
    h2Sobre.style.color = "#282828";
  }
  if (npet) {
    npet.style.color = "#282828";
  }
  if (h2Erro) {
    h2Erro.style.color = "#282828";
  }
  if (pErro) {
    pErro.style.color = "#282828";
  }
  if (logintxt) {
    logintxt.style.color = "#282828";
  }
  if (currentPage) {
    currentPage.style.color = "#282828";
  }
  if (noPostsMessage) {
    noPostsMessage.style.color = "#282828";
  }
  transitionTime = 0.6;
}
