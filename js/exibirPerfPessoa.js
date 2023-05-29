const nome = document.getElementById('name');
const idade = document.getElementById('idade');
const bairro1 = document.getElementById('bairro');
const telefone1 = document.getElementById('telefone');
const fotopet = document.getElementById('fotopet');


document.addEventListener("DOMContentLoaded", function () {
    // Recupera os dados do localStorage
    var nome2 = localStorage.getItem("nome2");
    var idade2 = localStorage.getItem("idade2");
    var bairro = localStorage.getItem("bairro");
    var caminhoImagem = localStorage.getItem("imagempessoa");
    var caminhoImagem2 = localStorage.getItem("imagempet");
    var telefone = localStorage.getItem("telefone");

    // Exibe eles na página
    nome.innerHTML = nome2;
    idade.innerHTML = idade2 + " Anos";
    bairro1.innerHTML = bairro;
    telefone1.innerHTML = telefone;

    var imgElement = document.getElementById("pic");
    imgElement.src = caminhoImagem;

    var imgElement2 = document.getElementById("fotopet");
    imgElement2.src = caminhoImagem2;

});
