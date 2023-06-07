import data from "./pets.json" assert { type: "json" };

const fotopet = document.getElementById("imgpetc");
var login = localStorage.getItem("login");
const taNoMural = document.getElementById("formm");
const mural = document.getElementById("mural");

document.addEventListener("DOMContentLoaded", function () {
  let loginId;
  data.pets.push();

  if (login != "true") {
    window.location.href = "index.html";
  }
  fetch("js/pets.json")
    .then((response) => response.json())
    .then((responseJson) => {
      if (taNoMural) {
        var caminhoImagem2 = localStorage.getItem("imagempet");

        var imgElement2 = document.getElementById("imgpetc");
        if (caminhoImagem2 == null) {
          imgElement2.style.display = "none";
        } else {
          imgElement2.src = caminhoImagem2;
        }

        const regiaoSelect = document.getElementById("bairro2");
        const idadeSelect = document.getElementById("idade");
        const racaSelect = document.getElementById("raca");

        regiaoSelect.addEventListener("change", atualizarFiltro);
        idadeSelect.addEventListener("change", atualizarFiltro);
        racaSelect.addEventListener("change", atualizarFiltro);
        
          function atualizarFiltro() {
         
    
          const regiaoSelecionada = regiaoSelect.value;
          const idadeSelecionada = idadeSelect.value;
          const racaSelecionada = racaSelect.value;

          for (var i = 1; i <= 14; i++) {
            const picfotopeti = document.getElementById(i.toString());
            var pet = data.pets.find(FindByID);

            const atendeFiltro =
              (regiaoSelecionada === "0" || pet.regiao === regiaoSelecionada) &&
              (idadeSelecionada === "" || pet.age.toString() === idadeSelecionada) &&
              (racaSelecionada === "0" || pet.raca.toString() === racaSelecionada);

            if (atendeFiltro) {
              picfotopeti.style.display = "inline-block";
              if (caminhoImagem2 != null) {
                imgElement2.style.display = "inline-block";
              }
            } else {
              imgElement2.style.display = "none";
              picfotopeti.style.display = "none";
            }

            function FindByID(pet) {
              return pet.id === i;
            }
          }
        }

        for (var i = 1; i <= 14; i++) {
          loginId = i;
          var a = document.createElement("a");

          var picfotopeti = document.createElement("img");
          picfotopeti.setAttribute("id", i.toString());
          picfotopeti.style.display = "inline-block";
          a.setAttribute("href", "perfilpf.html" + "?pet=" + i);
          var pet = data.pets.find(FindByID);
          console.log(pet.name);
          picfotopeti.src = pet.image;

          function FindByID(pet) {
            return pet.id === i;
          }
          a.appendChild(picfotopeti);
          mural.appendChild(a);
        }
      }
    });
});
