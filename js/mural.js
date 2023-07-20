var login = localStorage.getItem("login");
const taNoMural = document.getElementById("formm2");
const loader = document.getElementById("loader");
const hamster = document.getElementById("hamster");
const section = document.getElementById("modalNovo"),
  overlay = document.querySelector(".overlay"),
  showBtn = document.querySelector(".show-modal"),
  neverBtn = document.querySelector(".never-btn");
var abrirModal = localStorage.getItem("consciente");
loader.style.display = "flex";
hamster.classList.add("active");


document.addEventListener("DOMContentLoaded", async function () {
  const apiUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/31/municipios";
      function fillMunicipiosSelect(municipios) {
        const municipiosSelect = document.getElementById("bairro2");

        municipios.forEach((municipio) => {
          const option = document.createElement("option");
          option.value = municipio.nome;
          option.text = municipio.nome;
          municipiosSelect.appendChild(option);
        });
      }
      fetch(apiUrl)
        .then((response) => response.json())
        .then((municipios) => {
          fillMunicipiosSelect(municipios);
        })
        .catch((error) => {
          console.error("Erro ao obter os municípios:", error);
        });
  /*neverBtn.addEventListener("click", function () {
    localStorage.setItem("consciente", "true");*/
    section.classList.remove("active");
 // });
 /* if (abrirModal != "true") {
    section.classList.add("active");
  }*/
  let loginId;
  const chkFavoritos = document.getElementById("chkFavoritos");
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const textoMural = document.getElementById("textoMural");
  var response = await fetch(`https://api.adotesuapatinha.com/mural`,
  { credentials: "include" }
);

  var data = await response.json();

  if (data) {
    setTimeout(function () {
      hamster.classList.remove("active");
      setTimeout(function () {
        loader.style.display = "none";
      }, 300);
    }, 300);
  } else {
    loader.style.display = "flex";
    hamster.classList.add("active");
  }

  var qtdPets = data.pets.length;
  const petsPorPagina = 28;
  let currentPage = 1;
  const totalPages = Math.ceil(qtdPets / petsPorPagina);
  if (taNoMural) {
    const regiaoSelect = document.getElementById("bairro2");
    const idadeSelect = document.getElementById("idade");
    const racaSelect = document.getElementById("raca");
    const especieSelect = document.getElementById("especie");

    regiaoSelect.addEventListener("change", atualizarFiltro2);
    idadeSelect.addEventListener("change", atualizarFiltro2);
    racaSelect.addEventListener("change", atualizarFiltro2);
    especieSelect.addEventListener("change", atualizarFiltro2);
    chkFavoritos.addEventListener("change", atualizarFiltro2);

    regiaoSelect.addEventListener("change", atualizarFiltro);
    idadeSelect.addEventListener("change", atualizarFiltro);
    racaSelect.addEventListener("change", atualizarFiltro);
    especieSelect.addEventListener("change", atualizarFiltro);
    chkFavoritos.addEventListener("change", atualizarFiltro);

    function atualizarFiltro2() {
      currentPage = 1;
      currentPageSpan.textContent = "Página " + currentPage;
    }

    function atualizarFiltro() {
      let petsDisponiveis = 0;
      const startIndex = (currentPage - 1) * petsPorPagina;
      const endIndex = startIndex + petsPorPagina;

      const apenasFavoritos = chkFavoritos.checked;
      const regiaoSelecionada = regiaoSelect.value;
      const idadeSelecionada = idadeSelect.value;
      const racaSelecionada = racaSelect.value;
      const especieSelecionada = especieSelect.value;
      const petsFiltrados = data.pets.filter((pet) => {
        const isFavorito = favoritos.includes(pet.id.toString());
        const atendeFiltro =
          (regiaoSelecionada === "0" || pet.regiao === regiaoSelecionada) &&
          (idadeSelecionada === "" ||
            pet.age.toString() === idadeSelecionada) &&
          (especieSelecionada === "0" ||
            pet.esp.toString() === especieSelecionada) &&
          (racaSelecionada === "0" || pet.raca.toString() === racaSelecionada);
        return atendeFiltro && (isFavorito || !apenasFavoritos);
      });

      if (petsFiltrados.length <= petsPorPagina) {
        nextPageBtn.disabled = true;
      } else {
        nextPageBtn.disabled = false;
      }

      const petsContainer = document.getElementById("petsf");
      petsContainer.innerHTML = "";

      if (petsFiltrados.length === 0) {
        textoMural.textContent =
          "Nenhum pet disponível com os filtros selecionados.";
        return;
      }

      for (let i = startIndex; i < endIndex; i++) {
        if (i >= petsFiltrados.length) {
          break;
        }

        const pet = petsFiltrados[i];
        const petId = pet.id.toString();

        const a2 = document.createElement("a");
        a2.setAttribute("href", "perfilpf.html" + "?pet=" + petId);

        const picfotopeti = document.createElement("img");
        picfotopeti.setAttribute("id", petId);
        picfotopeti.src = pet.image;

        const favoritoBtn = document.createElement("button");
        favoritoBtn.classList.add("btn-favorito");
        favoritoBtn.classList.add("botaofav" + petId);
        favoritoBtn.dataset.petId = petId;
        favoritoBtn.classList.add("posiciona-favorito");
        favoritoBtn.classList.add("heart-btn");

        if (favoritos.includes(petId)) {
          favoritoBtn.classList.add("favoritado");

          if (apenasFavoritos) {
            if (a2.parentNode) {
              a2.parentNode.classList.add("encolher");
            }
          }
        }

        favoritoBtn.addEventListener("click", function () {
          const petId = this.dataset.petId;
          const container = this.parentNode;

          if (favoritos.includes(petId)) {
            favoritos.splice(favoritos.indexOf(petId), 1);
            this.classList.remove("favoritado");

            if (container) {
              if (apenasFavoritos) {
                container.classList.add("encolher");
              }

              setTimeout(function () {
                if (container.parentNode) {
                  container.parentNode.removeChild(container);
                }
                atualizarFiltro();
              }, 300);
            } else {
              atualizarFiltro();
            }
          } else {
            favoritos.push(petId);
            this.classList.add("favoritado");
            setTimeout(function () {
              atualizarFiltro();
            }, 200);
          }

          localStorage.setItem("favoritos", JSON.stringify(favoritos));
        });

        const container = document.createElement("div");
        container.classList.add("imagem-container");
        container.appendChild(favoritoBtn);
        container.appendChild(a2);
        a2.appendChild(picfotopeti);
        petsContainer.appendChild(container);

        petsDisponiveis++;
      }

      if (apenasFavoritos) {
        if (favoritos.length > 0) {
          textoMural.textContent = "Seus pets favoritos:";
        } else {
          textoMural.textContent = "Você não tem pets favoritos.";
        }
      } else {
        if (
          regiaoSelecionada === "0" &&
          idadeSelecionada === "" &&
          especieSelecionada === "0" &&
          racaSelecionada === "0"
        ) {
          textoMural.textContent = "Pets disponíveis:";
        } else if (petsDisponiveis > 0) {
          textoMural.textContent =
            "Foram encontrados " + petsDisponiveis + " pets nessas condições:";
        } else {
          textoMural.textContent =
            "Nenhum pet disponível com os filtros selecionados.";
        }
      }
    }

    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const currentPageSpan = document.getElementById("currentPage");

    prevPageBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        currentPageSpan.textContent = "Página " + currentPage;
        atualizarFiltro();
        window.scrollTo(0, 0);
      }
    });

    nextPageBtn.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        currentPageSpan.textContent = "Página " + currentPage;
        atualizarFiltro();
        window.scrollTo(0, 0);
      }
    });

    currentPageSpan.textContent = "Página " + currentPage;
    atualizarFiltro();
  }
});
