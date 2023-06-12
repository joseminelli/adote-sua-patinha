import data from "./pets.json" assert { type: "json" };

const fotopet = document.getElementById("imgpetc");
var login = localStorage.getItem("login");
const taNoMural = document.getElementById("formm");
const mural = document.getElementById("mural");

document.addEventListener("DOMContentLoaded", function () {
  let loginId;
  data.pets.push();

  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

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
        const especieSelect = document.getElementById("especie");

        regiaoSelect.addEventListener("change", atualizarFiltro);
        idadeSelect.addEventListener("change", atualizarFiltro);
        racaSelect.addEventListener("change", atualizarFiltro);
        especieSelect.addEventListener("change", atualizarFiltro);

        function atualizarFiltro() {
          const apenasFavoritos =
            document.getElementById("apenas-favoritos").checked;
          const regiaoSelecionada = regiaoSelect.value;
          const idadeSelecionada = idadeSelect.value;
          const racaSelecionada = racaSelect.value;
          const especieSelecionada = especieSelect.value;

          for (var i = 1; i <= 14; i++) {
            const petId = i.toString();
            const picfotopeti = document.getElementById(petId);
            var pet = data.pets.find(FindByID);
            const isFavorito = favoritos.includes(petId);

            const atendeFiltro =
              (regiaoSelecionada === "0" || pet.regiao === regiaoSelecionada) &&
              (idadeSelecionada === "" ||
                pet.age.toString() === idadeSelecionada) &&
              (especieSelecionada === "0" ||
                pet.esp.toString() === especieSelecionada) &&
              (racaSelecionada === "0" ||
                pet.raca.toString() === racaSelecionada);

            if (atendeFiltro && (isFavorito || !apenasFavoritos)) {
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
          const petId = i.toString();
          var a = document.createElement("a");

          const favoritoBtn = document.createElement("button");
          favoritoBtn.classList.add("btn-favorito");
          favoritoBtn.dataset.petId = petId;

          var picfotopeti = document.createElement("img");
          picfotopeti.setAttribute("id", i.toString());
          picfotopeti.style.display = "inline-block";
          //a.setAttribute("href", "perfilpf.html" + "?pet=" + i);
          var pet = data.pets.find(FindByID);
          console.log(pet.name);
          picfotopeti.src = pet.image;

          if (favoritos.includes(petId)) {
            favoritoBtn.classList.add("favoritado");
          }

          favoritoBtn.addEventListener("click", function () {
            const petId = this.dataset.petId;

            if (favoritos.includes(petId)) {
              favoritos.splice(favoritos.indexOf(petId), 1);
              this.classList.remove("favoritado");
            } else {
              favoritos.push(petId);
              this.classList.add("favoritado");
            }

            localStorage.setItem("favoritos", JSON.stringify(favoritos));

            var fav = localStorage.getItem("favoritos");
            console.log(fav);
          });

          function FindByID(pet) {
            return pet.id === i;
          }

          a.appendChild(favoritoBtn);
          a.appendChild(picfotopeti);
          mural.appendChild(a);
        }
      }
    });
});
