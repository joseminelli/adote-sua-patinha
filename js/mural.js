import data from "./pets.json" assert { type: "json" };

const fotopet = document.getElementById("imgpetc");
var login = localStorage.getItem("login");
const taNoMural = document.getElementById("formm");

document.addEventListener("DOMContentLoaded", function () {
  let loginId;
  const chkFavoritos = document.getElementById("chkFavoritos");
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

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

    const regiaoSelect = document.getElementById("bairro2");
    const idadeSelect = document.getElementById("idade");
    const racaSelect = document.getElementById("raca");
    const especieSelect = document.getElementById("especie");

    regiaoSelect.addEventListener("change", atualizarFiltro);
    idadeSelect.addEventListener("change", atualizarFiltro);
    racaSelect.addEventListener("change", atualizarFiltro);
    especieSelect.addEventListener("change", atualizarFiltro);
    chkFavoritos.addEventListener("change", atualizarFiltro);

    function atualizarFiltro() {
      const apenasFavoritos = chkFavoritos.checked;
      const regiaoSelecionada = regiaoSelect.value;
      const idadeSelecionada = idadeSelect.value;
      const racaSelecionada = racaSelect.value;
      const especieSelecionada = especieSelect.value;

      for (var i = 1; i <= 13; i++) {
        var pet = data.pets.find(FindByID);
        const petId = i.toString();
        var picfotopeti = document.getElementById(petId);
        var btnfavorito = document.getElementsByClassName(
          "botaofav" + petId
        )[0];

        const isFavorito = favoritos.includes(petId);

        const atendeFiltro =
          (regiaoSelecionada === "0" || pet.regiao === regiaoSelecionada) &&
          (idadeSelecionada === "" ||
            pet.age.toString() === idadeSelecionada) &&
          (especieSelecionada === "0" ||
            pet.esp.toString() === especieSelecionada) &&
          (racaSelecionada === "0" || pet.raca.toString() === racaSelecionada);

        if (atendeFiltro && (isFavorito || !apenasFavoritos)) {
          picfotopeti.style.display = "inline-block";
          btnfavorito.style.display = "inline-block";
          if (caminhoImagem2 != null) {
            imgElement2.style.display = "inline-block";
          }
        } else {
          imgElement2.style.display = "none";
          picfotopeti.style.display = "none";
          btnfavorito.style.display = "none";
        }

        function FindByID(pet) {
          return pet.id === i;
        }
      }
    }

    for (var i = 1; i <= 13; i++) {
      loginId = i;
      const petId = i.toString();
      var a = document.createElement("a");
      var a2 = document.createElement("a");

      const picfotopeti = document.createElement("img");
      picfotopeti.setAttribute("id", i.toString());
      picfotopeti.style.display = "inline-block";

      const favoritoBtn = document.createElement("button");
      favoritoBtn.classList.add("btn-favorito");
      favoritoBtn.classList.add("botaofav" + petId);
      favoritoBtn.dataset.petId = petId;
      favoritoBtn.classList.add("posiciona-favorito");
      favoritoBtn.classList.add("heart-btn");

      a2.setAttribute("href", "perfilpf.html" + "?pet=" + i);
      var pet = data.pets.find(FindByID);

      picfotopeti.src = pet.image;

      if (favoritos.includes(petId)) {
        favoritoBtn.classList.add("favoritado");
      }

      favoritoBtn.addEventListener("click", function () {
        const petId = this.dataset.petId;

        if (favoritos.includes(petId)) {
          favoritos.splice(favoritos.indexOf(petId), 1);
          this.classList.remove("favoritado");
          atualizarFiltro();
        } else {
          favoritos.push(petId);
          this.classList.add("favoritado");
          atualizarFiltro();
        }

        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        var fav = localStorage.getItem("favoritos");
      });
      const container = document.createElement("div");
      container.classList.add("imagem-container");
      const mural = document.getElementById("mural");

     
      mural.appendChild(a2);
      mural.appendChild(a);
      container.appendChild(favoritoBtn); 
      container.appendChild(a2);
      a2.appendChild(picfotopeti);
      a.appendChild(container);

      function FindByID(pet) {
        return pet.id === i;
      }
    }
  }
});
