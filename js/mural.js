import data from "./pets.json" assert { type: "json" };

const fotopet = document.getElementById("imgpetc");
var login = localStorage.getItem("login");
document.addEventListener("DOMContentLoaded", function () {
  let loginId;
  data.pets.push();

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
  for (var i = 1; i < 13; i++) {
    loginId = i;
    const picfotopeti = document.getElementById(i.toString());
    var pet = data.pets.find(FindByID);
    console.log(pet.name);
    picfotopeti.src = pet.image;

    function FindByID(pet) {
      return pet.id === i;
    }
  }
});
