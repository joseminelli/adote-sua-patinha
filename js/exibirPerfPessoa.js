const nome = document.getElementById("name");
const fotoPet = document.getElementById("fotoPet");
const idade = document.getElementById("idade");
const bairro1 = document.getElementById("bairro");
const telefone1 = document.getElementById("telefone");
const fotopet = document.getElementById("fotopet");
var login = localStorage.getItem("login");
const delBtnDiv = document.getElementById("delBtnDiv");

document.addEventListener("DOMContentLoaded", async function () {
  const login = localStorage.getItem("login");
  if (login !== "true") {
    window.location.href = "index.html";
    return;
  }

  const editar = document.getElementById("editar");
  const comPet = document.getElementById("spet");
  const semPet = document.getElementById("npet");

  try {
    const response = await fetch(
      "https://adotesuapatinhaapi.azurewebsites.net/usuario"
    );
    if (!response.ok) {
      throw new Error("Erro ao obter as informações do usuário");
    }
    const usuario = await response.json();

    if (!usuario) {
      throw new Error("Usuário não encontrado");
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

  editar.addEventListener("click", function () {
    window.location.href = "cadastro1.html";
  });

  var imgElement2 = document.getElementById("fotopet");
  if (caminhoImagem2 == null) {
    imgElement2.style.display = "none";
    comPet.style.display = "none";
    semPet.style.display = "run-in";
    delBtnDiv.style.display = "none";
  } else {
    imgElement2.src = caminhoImagem2;
    semPet.style.display = "none";
    comPet.style.display = "run-in";
    delBtnDiv.style.display = "run-in";
  }
});
