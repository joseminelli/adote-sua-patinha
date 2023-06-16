var login = localStorage.getItem("login");
const taNoMural = document.getElementById("formm");

document.addEventListener("DOMContentLoaded", async function () {
  let loginId;
  const chkFavoritos = document.getElementById("chkFavoritos");
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const textoMural = document.getElementById("textoMural");
  if (login != "true") {
    window.location.href = "index.html";
  }
  var response = await fetch("js/pets.json");
  var data = await response.json();
  var qtdPets = data.pets.length;
  const petsPorPagina = 28; // Número máximo de pets por página
  let currentPage = 1; // Página atual
  const totalPages = Math.ceil(qtdPets / petsPorPagina); // Número total de páginas
  console.log(qtdPets);
  if (taNoMural) {
    var caminhoImagem2 = localStorage.getItem("imagempet");

    const regiaoSelect = document.getElementById("bairro2");
    const idadeSelect = document.getElementById("idade");
    const racaSelect = document.getElementById("raca");
    const especieSelect = document.getElementById("especie");

    regiaoSelect.addEventListener("change", atualizarFiltro);
    idadeSelect.addEventListener("change", atualizarFiltro);
    racaSelect.addEventListener("change", atualizarFiltro);
    especieSelect.addEventListener("change", atualizarFiltro);
    chkFavoritos.addEventListener("change", atualizarFiltro);

    
    regiaoSelect.addEventListener("change", atualizarFiltro2);
    idadeSelect.addEventListener("change", atualizarFiltro2);
    racaSelect.addEventListener("change", atualizarFiltro2);
    especieSelect.addEventListener("change", atualizarFiltro2);
    chkFavoritos.addEventListener("change", atualizarFiltro2);

    function atualizarFiltro2() {
      currentPage = 1;
      currentPageSpan.textContent = "Página " + currentPage;
    }

    function atualizarFiltro() {
      let petsDisponiveis = 0; // Contador de pets disponíveis
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
      petsContainer.innerHTML = ""; // Limpar os pets exibidos anteriormente

      if (petsFiltrados.length === 0) {
        textoMural.textContent = "Nenhum pet disponível com os filtros selecionados.";
        return; // Encerrar a função se não houver pets filtrados
      }

      for (let i = startIndex; i < endIndex; i++) {
        if (i >= petsFiltrados.length) {
          break; // Encerrar o loop se não houver mais pets para exibir
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
      }
    });
    
    
    nextPageBtn.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        currentPageSpan.textContent = "Página " + currentPage;
        atualizarFiltro();
      }
    });

    currentPageSpan.textContent = "Página " + currentPage;
    atualizarFiltro();
  }
});
