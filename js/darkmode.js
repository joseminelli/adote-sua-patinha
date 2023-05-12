var sun = document.getElementById("sun");
const body = document.querySelector("body");
const p = document.querySelector("div.mural > p");

sun.onclick = function () {
  sun.classList.toggle("night");
  if (p) {
    if (this.classList.toggle("darkToggle")) {
      body.style.background = "#1a1a1a";
      p.style.color = "#ffffff";
      body.style.transition = "1s";
    } else {
      body.style.background = "#ffffff";
      p.style.color = "#1a1a1a";
    }
  } else {
    if (this.classList.toggle("darkToggle")) {
      body.style.background = "#1a1a1a";
      body.style.transition = "1s";
    } else {
      body.style.background = "#ffffff";
    }
  }
};
