import settings from "./settings.js";
const nome = document.getElementById("name");
const idade = document.getElementById("idade");
const bairro1 = document.getElementById("bairro");
const telefone1 = document.getElementById("telefone2");
const fotopetDiv = document.getElementById("fotoPet2");
const hamster = document.getElementById("hamster");
const loader = document.getElementById("loader");
const comPet = document.getElementById("spet");
const verificado = document.getElementById("verificado");
const semPet = document.getElementById("npet");

async function verificarCookie() {
  try {
    const response = await fetch(`${settings.ApiUrl}/verificarSemCookie`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    } else {
      console.error("Erro ao verificar o cookie:", response.status);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

async function exibirPets() {
  try {
    const response = await fetch(`${settings.ApiUrl}/perfil`, {
      credentials: "include",
    });

    const pets = await response.json();
    if (!response.ok) {
      throw new Error("Erro ao obter as fotos dos pets");
    } else {
      var petElementsHTML = "";
      pets.forEach((pet) => {
        petElementsHTML += `<div id="pet" class="pet"> 
        <div id="delBtnDiv${pet.id}" class="delBtnDiv">
          <div id="btnDel" class="btnDel" onclick="excluirPet(${pet.id})">
            <div class="x1"></div>
            <div class="x2"></div>
          </div>
        </div>
        <a href="perfilpf.html?pet=${pet.id}">
          <img id="fotopet" src="${pet.image}">
        </a>
      </div>`;
        fotopetDiv.innerHTML = petElementsHTML;
      });
      if (petElementsHTML == "") {
        fotopetDiv.style.display = "none";
        comPet.style.display = "none";
        semPet.style.display = "flex";
      } else {
        fotopetDiv.style.display = "flex";
        semPet.style.display = "none";
        comPet.style.display = "flex";
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function excluirPet(petId) {
  setTimeout(function () {
    fetch(`${settings.ApiUrl}/excluirPet/${petId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir o pet.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Pet excluído com sucesso!");
        exibirPets();
      })
      .catch((error) => {
        console.error(error);
      });
  }, 300);
}

document.excluirPet = excluirPet;
document.addEventListener("DOMContentLoaded", async function () {
  exibirPets();
  loader.style.display = "flex";
  hamster.classList.add("active");

  // const editar = document.getElementById("editar");

  try {
    const response = await fetch(`${settings.ApiUrl}/usuario`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Erro ao obter as informações do usuário");
    }
    const usuario = await response.json();

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    } else {
      loader.style.display = "none";
      hamster.classList.remove("active");
    }
    if (usuario.ong === "sim") {
      verificado.classList.add("fa-circle-check");
    }
    nome.innerHTML = usuario.name;
    idade.innerHTML = `${usuario.age} Anos`;
    bairro1.innerHTML = usuario.regiao;
    telefone1.innerHTML = usuario.telefone;

    var imgElement = document.getElementById("pic");
    imgElement.src = usuario.image;
  } catch (error) {
    console.error(error);
  }

  verificarCookie();

  /*editar.addEventListener("click", function () {
    window.location.href = "cadastro1.html";
  });*/
});
