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
    var enviarButton = document.getElementById("enviar");
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

            // Obtenha o caminho da imagem selecionada
            var inputImagem = document.getElementById("picture__input");
            var caminhoImagem = inputImagem.value;

            localStorage.setItem("imagem", caminhoImagem);

            // Redirecione para a outra página
            window.location.href = "perfilp.html";
        });
    }
});
