const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

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

document.addEventListener("DOMContentLoaded", function() {
    var enviarButton = document.getElementById("enviar"); // Botão do cadastro de pet
    var enviarButton2 = document.getElementById("enviar2"); // Botão do cadastro de pessoas
    if (enviarButton) {
        enviarButton.addEventListener("click", function(event) {
            event.preventDefault(); // Impede o envio do formulário padrão

            // Obtenha os valores dos campos do formulário
            var nome = document.getElementById("input").value;
            var idade = document.getElementById("idade").value;
            var raca = document.getElementById("raca").value;
            var descricao = document.getElementById("descricao").value;

            // Armazene os dados no localStorage
            localStorage.setItem("nome", nome);
            localStorage.setItem("idade", idade);
            localStorage.setItem("raca", raca);
            localStorage.setItem("descricao", descricao);

            if (nome === "" || descricao === "") {
                alert("Todos os campos são obrigatórios!");
                return;
            }

            // Obtenha o caminho da imagem selecionada
            var inputImagem = document.getElementById("picture__input");
            var caminhoImagem = inputImagem.value;

            localStorage.setItem("imagempet", caminhoImagem);

            // Redirecione para a outra página
            window.location.href = "perfilp.html";
        });
    }
    if (enviarButton2) {
        enviarButton2.addEventListener("click", function(event) {
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

            var inputImagem = document.getElementById("picture__input");
            var caminhoImagem = inputImagem.value;

            localStorage.setItem("imagempessoa", caminhoImagem);

            window.location.href = "perfil.html";
        });
    }
});

