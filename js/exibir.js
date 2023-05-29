const nomepet = document.getElementById('name');
const idadepet = document.getElementById('idade');
const raca1 = document.getElementById('raca');
const descricao1 = document.getElementById('desc');


document.addEventListener("DOMContentLoaded", function () {
    // Recupera os dados do localStorage
    var nomepet2 = localStorage.getItem("nome");
    var idadepet2 = localStorage.getItem("idade");
    var raca = localStorage.getItem("raca");
    var descricao = localStorage.getItem("descricao");
    var caminhoImagem = localStorage.getItem("imagempet");

    // Exibe eles na página
    nomepet.innerHTML = nomepet2;
    idadepet.innerHTML = idadepet2 + " Anos";
    raca1.innerHTML = raca;
    descricao1.innerHTML = descricao;

    var imgElement = document.getElementById("imagem");
    imgElement.src = caminhoImagem;

});
