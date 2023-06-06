const fotopet = document.getElementById("imgpetc");
var login = localStorage.getItem("login");

document.addEventListener("DOMContentLoaded", function () {
  if (login != "true") {
    window.location.href = "index.html";
  }

  var caminhoImagem2 = localStorage.getItem("imagempet");

  var imgElement2 = document.getElementById("imgpetc");
  if (caminhoImagem2 == null) {
    imgElement2.style.display = "none";
  } else {
    imgElement2.src = caminhoImagem2;
  }
});
