var sun = document.getElementById("sun");
const body = document.querySelector("body");
const p = document.querySelector("div.mural > p");
const h1 = document.querySelector("div#texto > h1");
const noPostsMessage = document.getElementById("noPostsMessage");
const npet = document.getElementById("npet");

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
  sun.classList.add("darkToggle");
  body.style.background = "#1a1a1a";
  body.style.transition = "0.6s";
  localStorage.setItem("darkModeEnabled", "true");
  if(p){
    p.style.color = "#ffffff";
  }
  if(npet){
    npet.style.color = "#ffffff";
  }
  if(noPostsMessage){
    noPostsMessage.style.color = "#ffffff";
  }
}


function disableDarkMode() {
  sun.classList.remove("darkToggle");
  body.style.background = "#ffffff";
  body.style.transition = "0.6s";
  localStorage.setItem("darkModeEnabled", "false");
  if(p){
    p.style.color = "#1a1a1a";
  }
  if(npet){
    npet.style.color = "#1a1a1a";
  }
  if(noPostsMessage){
    noPostsMessage.style.color = "#1a1a1a";
  }
}
