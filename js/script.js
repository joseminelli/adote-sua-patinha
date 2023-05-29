const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
var logado = false;

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

document.addEventListener("DOMContentLoaded", function () {
    var enviarButton = document.getElementById("enviar"); // Botão do cadastro de pet
    var enviarButton2 = document.getElementById("enviar2"); // Botão do cadastro de pessoas
    var loginButton = document.getElementById("login"); // Botão do cadastro de pessoas
    if (enviarButton) {
        enviarButton.addEventListener("click", function (event) {
            event.preventDefault();

            var nome = document.getElementById("input").value;
            var idade = document.getElementById("idade").value;
            var raca = document.getElementById("raca").value;
            var descricao = document.getElementById("descricao").value;

            localStorage.setItem("nome", nome);
            localStorage.setItem("idade", idade);
            localStorage.setItem("raca", raca);
            localStorage.setItem("descricao", descricao);

            if (nome === "" || descricao === "") {
                alert("Todos os campos são obrigatórios!");
                return;
            }

            var inputImagem = document.getElementById("picture__input");

            if (inputImagem.files && inputImagem.files[0]) {
                var imagem = inputImagem.files[0];

                var reader = new FileReader();

                reader.onload = function (e) {
                    var imagemBase64 = e.target.result;

                    localStorage.setItem("imagempet", imagemBase64);


                };

                reader.readAsDataURL(imagem);
            }
            
            logado = true;
            localStorage.setItem('login', logado);
            window.location.href = "perfilp.html";
        });
    }
    if (enviarButton2) {
        enviarButton2.addEventListener("click", function (event) {
            event.preventDefault();

            var nome2 = document.getElementById("input2").value;
            var idade2 = document.getElementById("idade2").value;
            var bairro = document.getElementById("bairro2").value;
            var telefone = document.getElementById("telefone").value;

            if (nome2 === "" || telefone === "") {
                alert("Todos os campos são obrigatórios!");
                return;
            }

            localStorage.setItem("nome2", nome2);
            localStorage.setItem("idade2", idade2);
            localStorage.setItem("bairro", bairro);
            localStorage.setItem("telefone", telefone);


            var inputImagem2 = document.getElementById("picture__input");

            if (inputImagem2.files && inputImagem2.files[0]) {
                var imagem2 = inputImagem2.files[0];

                var reader = new FileReader();

                reader.onload = function (e) {
                    var imagemBase642 = e.target.result;
                    localStorage.setItem("imagempessoa", imagemBase642);
                };
                reader.readAsDataURL(imagem2);
            }
            logado = true;
            localStorage.setItem("login", logado);
            window.location.href = "perfil.html";
        });
    }
    if (loginButton) {
        loginButton.addEventListener("click", function (event) {
            login2 = localStorage.getItem("login");
            if(login2 === "true"){
                window.location.href = "perfil.html";
            }else{
                alert("crie uma conta primeiro")
                return
            }
        });
    }
});

