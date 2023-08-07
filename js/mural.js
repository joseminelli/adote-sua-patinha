var login = localStorage.getItem("login");
const taNoMural = document.getElementById("formm2");
const loader = document.getElementById("loader");
const hamster = document.getElementById("hamster");
const minFiltro = document.getElementById("minFiltro");
const formm2 = document.getElementById("formm2");
const formHeader = document.getElementById("formHeader");
const content = document.getElementById("content");
const section = document.getElementById("modalNovo"),
  overlay = document.querySelector(".overlay"),
  showBtn = document.querySelector(".show-modal"),
  neverBtn = document.querySelector(".never-btn");
var abrirModal = localStorage.getItem("consciente");
loader.style.display = "flex";
hamster.classList.add("active");

var racaDog = [
  "Golden",
  "Akita",
  "Pastor",
  "Labrador",
  "Shih-tzu",
  "Labrador",
  "Corgi",
  "Beagle",
  "Yorkshire",
  "Husky",
  "Poodle",
  "Buldogue",
  "Pinscher",
  "Lhasa Apso",
  "Maltês",
  "Pug",
];

var racaCat = ["Persa", "Siamês", "Sphynx"];

function toggleClassOnDeviceWidth() {
  var screenWidth = window.innerWidth;

  if (screenWidth < 800) {
    mobile = true;
  } else {
    mobile = false;
  }
}

async function FindUser(petId) {
  try {
    const response = await fetch(
      `http://localhost:3000/findUsuarioByPet/${petId}`,
      {
        credentials: "include",
      }
    );
    const usuario = await response.json();
    return usuario;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}
document.addEventListener("DOMContentLoaded", async function () {
  toggleClassOnDeviceWidth();
  if (!mobile == true) {
    formm2.style.marginTop = "-3%";
    formm2.style.marginBottom = "-4%";
  } else {
    formm2.style.marginTop = "-15%";
    formm2.style.marginBottom = "-15%";
  }
  minFiltro.addEventListener("click", function () {
    if (!content.classList.contains("active")) {
      formHeader.style.overflow = "auto";
      content.style.overflow = "auto";
      content.style.overflowY = "hidden";
      content.classList.add("active");
      formm2.style.marginTop = "1%";
      content.style.height = "95%";
      formm2.style.marginBottom = "2%";
      minFiltro.style.rotate = "180deg";
    } else {
      formHeader.style.overflow = "hidden";
      content.style.overflow = "hidden";
      content.style.height = "45%";
      minFiltro.style.rotate = "0deg";
      if (!mobile == true) {
        formm2.style.marginTop = "-3%";
        formm2.style.marginBottom = "-4%";
      } else {
        formm2.style.marginTop = "-15%";
        formm2.style.marginBottom = "-15%";
      }
      content.classList.remove("active");
    }
  });
  racaDog.sort();
  racaDog.forEach(function (item) {
    addOption(item);
  });
  racaCat.sort();
  racaCat.forEach(function (item) {
    addOption(item);
  });

  const especieinput = document.getElementById("especie");

  especieinput.addEventListener("change", function (event) {
    var select = document.getElementById("raca");
    select.innerHTML = "";
    select.add(new Option("Selecione", "0"));
    select.add(new Option("Sem Raça", "Sem Raça"));
    if (especieinput.value == "Cachorros") {
      racaDog.sort();
      racaDog.forEach(function (item) {
        addOption(item);
      });
    }
    if (especieinput.value == "Gato") {
      racaCat.sort();
      racaCat.forEach(function (item) {
        addOption(item);
      });
    }
    if (especieinput.value === "0") {
      racaDog.sort();
      racaDog.forEach(function (item) {
        addOption(item);
      });
      racaCat.sort();
      racaCat.forEach(function (item) {
        addOption(item);
      });
    }
  });

  function addOption(valor) {
    var option = new Option(valor, valor);
    var select = document.getElementById("raca");
    select.add(option);
  }
  const apiUrl =
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados/31/municipios";
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
  var response = await fetch(`https://api.adotesuapatinha.com/mural`, {
    credentials: "include",
  });

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

    $("#bairro2").on("change", function () {
      atualizarFiltro2();
      atualizarFiltro();
    });
    $("#idade").on("change", function () {
      atualizarFiltro2();
      atualizarFiltro();
    });
    $("#raca").on("change", function () {
      atualizarFiltro2();
      atualizarFiltro();
    });
    $("#especie").on("change", function () {
      atualizarFiltro2();
      atualizarFiltro();
    });
    chkFavoritos.addEventListener("change", atualizarFiltro2);
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
        FindUser(petId).then((user) => {
          
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
          if (user.ong == "sim") {
            const seloImg = document.createElement("img");
            seloImg.classList.add("selo");
            seloImg.src = "https://cdn.discordapp.com/attachments/933499827638124575/1138222343349600321/selo.png";
            container.appendChild(seloImg);
          }

          petsDisponiveis++;
        });
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
