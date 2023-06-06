import data from "./pets.json" assert { type: "json" };

const fotopet = document.getElementById("imgpetc");
var login = localStorage.getItem("login");
const taNoMural = document.getElementById("formm");
const taNoPerfilfake = document.getElementsByClassName("pefilFake");
const mural = document.getElementById("mural");

document.addEventListener("DOMContentLoaded", function () {
  let loginId;
  data.pets.push();

  if (login != "true") {
    window.location.href = "index.html";
  }
  if (taNoMural) {
    var caminhoImagem2 = localStorage.getItem("imagempet");

    var imgElement2 = document.getElementById("imgpetc");
    if (caminhoImagem2 == null) {
      imgElement2.style.display = "none";
    } else {
      imgElement2.src = caminhoImagem2;
    }
    for (var i = 1; i < 13; i++) {
      loginId = i;
      var a = document.createElement("a");

      var picfotopeti = document.createElement("img");
      picfotopeti.setAttribute("id",i.toString());
      a.setAttribute("href", "perfilpf.html" + "?pet=" + i)
      var pet = data.pets.find(FindByID);
      console.log(pet.name);
      picfotopeti.src = pet.image;

      function FindByID(pet) {
        return pet.id === i;
      }
      a.appendChild(picfotopeti)
      mural.appendChild(a)
    }
  }
});
