const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
var logado = false;

function CustomAlert(){
    this.alert = function(message,title){
      document.body.innerHTML = document.body.innerHTML + '<div id="overlay" class="animado"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="alertHeader"></div><div id="alertBody"></div><div id="alertFooter"></div></div></div>';
  
      let overlay = document.getElementById('overlay');
      let dialogbox = document.getElementById('dialogbox');
      
      let winH = window.innerHeight;
      overlay.style.height = winH+"px";
      
  
      overlay.style.display = "block";
      dialogbox.style.display = "block";
      
      document.getElementById('alertHeader').style.display = 'block';
  
      if(typeof title === 'undefined') {
        document.getElementById('alertHeader').style.display = 'none';
      } else {
        document.getElementById('alertHeader').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
      }
      document.getElementById('alertBody').innerHTML = message;
      document.getElementById('alertFooter').innerHTML = '<button class="pure-material-button-contained active" onclick="customAlert.ok()">OK</button>';
    }
    
    this.ok = function(){
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('overlay').style.display = "none";
    }
  }
  
  let customAlert = new CustomAlert();

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
    var login = localStorage.getItem("login");
    if (enviarButton) {
        //não acessa a página se não tiver login
        if (login != "true") {
            window.location.href = "index.html";
        }
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

            if (nome === "" || descricao === "" || raca === "0") {
                new customAlert.alert('Você precisa preencher todos os campos','Atenção!');
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
            } else { //obriga a colocar uma imagem
                customAlert.alert('Seu pet precisa de uma foto','Atenção!');
                return
            }

            logado = true;
            localStorage.setItem('login', logado);
            window.location.href = "perfilp.html";
        });
    }
    if (enviarButton2) {
        //cria as opcões de idade dinamicamente
        var selectIdade = document.getElementById("idade2");

        for (var i = 18; i <= 100; i++) {
            var option = document.createElement("option");
            option.setAttribute("value", i);
            option.textContent = i;
            selectIdade.appendChild(option);
        }

        enviarButton2.addEventListener("click", function (event) {
            event.preventDefault();

            var nome2 = document.getElementById("input2").value;
            var idade2 = document.getElementById("idade2").value;
            var bairro = document.getElementById("bairro2").value;
            var telefone = document.getElementById("telefone").value;
            if (nome2 === "" || telefone === "" || bairro === "0") {
                customAlert.alert('Você precisa preencher todos os campos','Atenção!');
                return
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
            } else {
                customAlert.alert('Você precisa escolher uma foto','Atenção!');
                return
            }
            logado = true;
            localStorage.setItem("login", logado);
            window.location.href = "perfil.html";
        });
    }
    if (loginButton) {
        loginButton.addEventListener("click", function (event) {
            login2 = localStorage.getItem("login");
            if (login2 === "true") {
                window.location.href = "perfil.html";
            } else {
                customAlert.alert('Você precisa criar uma conta primeiro','Atenção!');
                return
            }
        });
    }
});

