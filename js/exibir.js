const nomepet = document.getElementById('name');
const idadepet = document.getElementById('idade');
const raca1 = document.getElementById('raca');
const descricao1 = document.getElementById('desc');

    // Obtenha os valores dos parâmetros
    var nomepet2 = localStorage.getItem("nome");
    var idadepet2 = localStorage.getItem("idade");
    var raca = localStorage.getItem("raca");
    var descricao = localStorage.getItem("descricao");


    nomepet.innerHTML = nomepet2;
    idadepet.innerHTML = idadepet2 + " Anos";
    raca1.innerHTML = raca;
    descricao1.innerHTML = descricao;


