const nome = document.getElementById('name');
const idade = document.getElementById('idade');
const bairro1 = document.getElementById('bairro');
const telefone1 = document.getElementById('telefone');
const fotopet = document.getElementById('fotopet');
var login = localStorage.getItem("login");


document.addEventListener("DOMContentLoaded", function () {
    //não acessa a página se não tiver login
    if(login != "true"){
        window.location.href = "index.html";
    }
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
    const comPet = document.getElementById('spet');
    const semPet = document.getElementById('npet');

    if(caminhoImagem2 == null){
        imgElement2.style.display = "none";
        comPet.style.display = "none";
        semPet.style.display = "run-in";
    }else{
        imgElement2.src = caminhoImagem2;
        semPet.style.display = "none";
        comPet.style.display = "run-in";
    }

});
