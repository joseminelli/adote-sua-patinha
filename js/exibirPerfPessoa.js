import settings from "./settings.js";
const nome = document.getElementById("name");
const idade = document.getElementById("idade");
const loading = document.querySelectorAll(".loading2");
const bairro1 = document.getElementById("bairro");
const telefone1 = document.getElementById("telefone2");
const divpets = document.getElementById("fotoPet");
const fotopetDiv = document.getElementById("fotoPet2");
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
      if (data.success === true) {
        window.location.href = "/main.html";
      } else {
        window.location.href = "/index.html";
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
    const response = await fetch(`${settings.ApiUrl}/userPets`, {
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
        divpets.style.display = "none";
        fotopetDiv.style.display = "none";
        comPet.style.display = "none";
        semPet.style.display = "flex";
      } else {
        divpets.style.display = "block";
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
    }
    if (usuario.ong === "sim") {
      verificado.classList.add("fa-circle-check");
    }
    setTimeout(function () {
      const name = document.getElementById("name");
      const idade = document.getElementById("idade");
      const bairro = document.getElementById("bairro");
      const telefone2 = document.getElementById("telefone2");
      loading.forEach((element) => {
        element.style.display = "none";
      });
      name.style.display = "block";
      idade.style.display = "block";
      bairro.style.display = "block";
      telefone2.style.display = "block";
      nome.innerHTML = usuario.name;
      idade.innerHTML = `${usuario.age} Anos`;
      bairro1.innerHTML = usuario.regiao;
      telefone1.innerHTML = usuario.telefone;

      var imgElement = document.getElementById("pic");
      imgElement.src = usuario.image;
    }, 300);
  } catch (error) {
    console.error(error);
  }

  verificarCookie();

  /*editar.addEventListener("click", function () {
    window.location.href = "cadastro1.html";
  });*/
});
