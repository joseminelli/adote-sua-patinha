var login = localStorage.getItem("login");
const nome = document.getElementById("name");
const fotoPet = document.getElementById("fotoPet");
const idade = document.getElementById("idade");
const bairro1 = document.getElementById("bairro");
const telefone1 = document.getElementById("telefone");
const fotopetDiv = document.getElementById("fotoPet2");
const hamster = document.getElementById("hamster");
const loader = document.getElementById("loader");
const btnDel = document.getElementById("btnDel");
const comPet = document.getElementById("spet");
const semPet = document.getElementById("npet");
var imgElement2 = document.getElementById("fotopet");

async function verificarCookie() {
  try {
    const response = await fetch("https://adotesuapatinhaapi.azurewebsites.net/verificarSemCookie", {
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
    const response = await fetch(
      "https://adotesuapatinhaapi.azurewebsites.net/perfil",
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Erro ao obter as fotos dos pets");
    }

    const petElementsHTML = await response.text();
    fotopetDiv.innerHTML = petElementsHTML;

    if (petElementsHTML == "") {
      fotopetDiv.style.display = "none";
      comPet.style.display = "none";
      semPet.style.display = "run-in";
    } else {
      fotopetDiv.style.display = "flex";
      semPet.style.display = "none";
      comPet.style.display = "run-in";
    }
  } catch (error) {
    console.error(error);
  }
}

function excluirPet(petId) {
  fetch(`https://adotesuapatinhaapi.azurewebsites.net/excluirPet/${petId}`, {
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
      console.log("Pet excluído com sucesso!", data);
      exibirPets();
    })
    .catch((error) => {
      console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", async function () {

  exibirPets();
  loader.style.display = "flex";
  hamster.classList.add("active");

  // const editar = document.getElementById("editar");

  try {
    const response = await fetch(
      "https://adotesuapatinhaapi.azurewebsites.net/usuario",
      { credentials: "include" }
    );
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
