const nomepet = document.getElementById("name");
const idadepet = document.getElementById("idade");
const raca1 = document.getElementById("raca");
const descricao1 = document.getElementById("desc");
const box = document.getElementById("box");
var login = localStorage.getItem("login");

document.addEventListener("DOMContentLoaded", function () {
  box.style.justifyContent = "left";
  //não acessa a página se não tiver login
  if (login != "true") {
    window.location.href = "index.html";
  }

  // Recupera os dados do localStorage
  var nomepet2 = localStorage.getItem("nome");
  var idadepet2 = localStorage.getItem("idade");
  var raca = localStorage.getItem("raca");
  var descricao = localStorage.getItem("descricao");
  var caminhoImagem = localStorage.getItem("imagempet");
  if (caminhoImagem != null) {
    // Exibe eles na página
    nomepet.innerHTML = nomepet2;
    idadepet.innerHTML = idadepet2 + " Anos";
    raca1.innerHTML = raca;
    descricao1.innerHTML = descricao;

    var imgElement = document.getElementById("imagem");
    imgElement.src = caminhoImagem;
  } else {
    box.style.justifyContent = "center";
    box.innerHTML = "<div id='erro404'><div><h2 id='h2Erro'>Algo deu errado</h2><p id='pErro'>O pet escolhido não foi encontrado</p></div><img id='imagemErro' src='./img/404.png'></div>";
  }
});
