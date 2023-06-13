var login = localStorage.getItem("login");

if (login != "true") {
  window.location.href = "index.html";
}

function loadPosts() {
  // Função que carrega as publicações
  var posts = JSON.parse(localStorage.getItem("posts")) || [];

  var content = document.querySelector(".content");
  var noPostsMessage = document.getElementById("noPostsMessage");

  content.innerHTML = "";

  if (posts.length === 0) {
    noPostsMessage.innerHTML = "Não há publicações";
    content.style.display = "none";
  } else {
    noPostsMessage.innerText = "";
    content.style.display = "block";

    posts.forEach(function (post, index) {
      var postElement = document.createElement("div");
      postElement.className = "post";
      postElement.innerHTML =
        '<button class="deleteBtn" data-index="' +
        index +
        '"><b>X</b></button>' +
        "<h3 id='forumh3'>" +
        post.titulo +
        "</h3>" +
        "<p>Categoria: " +
        post.categoria +
        "</p>" +
        "<p>" +
        post.descricao +
        "</p>";

      var replyContainer = document.createElement("div");
      replyContainer.className = "reply-container";
      replyContainer.innerHTML =
        '<p class="modalp2">Responder:</p>' +
        '<input type="text" class="inputmodal2 reply-input" placeholder="Digite sua resposta">' +
        '<button class="pure-material-button-contained active reply-btn">Responder</button>';

      postElement.appendChild(replyContainer);

      content.appendChild(postElement);

      // Verifica se há respostas para exibir
      if (post.respostas && post.respostas.length > 0) {
        var repliesContainer = document.createElement("div");
        repliesContainer.className = "replies-container";

        post.respostas.forEach(function (resposta) {
          var replyElement = document.createElement("div");
          replyElement.className = "reply";
          replyElement.innerHTML =
            "<p id='nomerply'>" +
            nomeresp +
            " respondeu:" +
            "</p>" +
            "<p id='descrply'>" +
            resposta.descricao +
            "</p>";

          repliesContainer.appendChild(replyElement);
        });

        postElement.appendChild(repliesContainer);
      }
    });

    var deleteButtons = document.querySelectorAll(".deleteBtn"); // Configura os botões que deletam a publicação
    deleteButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var index = parseInt(button.getAttribute("data-index"));
        deletePost(index);
      });
    });

    var replyButtons = document.querySelectorAll(".reply-btn"); // Configura os botões de resposta
    replyButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var postElement = button.parentNode.parentNode;
        var replyInput = postElement.querySelector(".reply-input");
        var replyText = replyInput.value.trim();
        if (replyText !== "") {
          var postIndex = Array.from(content.children).indexOf(postElement);
          var posts = JSON.parse(localStorage.getItem("posts")) || [];
          var post = posts[postIndex];
          if (!post.respostas) {
            post.respostas = [];
          }
          var replyPost = {
            descricao: replyText,
          };
          post.respostas.push(replyPost);
          localStorage.setItem("posts", JSON.stringify(posts));
          replyInput.value = "";
          loadPosts();
        }
      });
    });
  }
}

var nomeresp = localStorage.getItem("nome2");

function deletePost(index) {
  // função para deletar o post
  var posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
  loadPosts();
}

function CustomAlert2() {
  // Criação do objeto CustomAlert2
  this.createModal = function () {
    var overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.className = "animado";

    var dialogbox = document.createElement("div");
    dialogbox.id = "dialogbox2";
    dialogbox.className = "slit-in-vertical";

    var dialogContent = document.createElement("div");

    var alertHeader = document.createElement("div");
    alertHeader.id = "alertHeader";

    var alertBody = document.createElement("div");
    alertBody.id = "alertBody";

    var alertFooter = document.createElement("div");
    alertFooter.id = "alertFooter";

    dialogContent.appendChild(alertHeader);
    dialogContent.appendChild(alertBody);
    dialogContent.appendChild(alertFooter);

    dialogbox.appendChild(dialogContent);

    document.body.appendChild(overlay);
    document.body.appendChild(dialogbox);
  };

  this.displayModal = function (title) {
    // Função para exibir o modal
    var overlay = document.getElementById("overlay");
    var dialogbox = document.getElementById("dialogbox2");
    var alertHeader = document.getElementById("alertHeader");

    overlay.style.display = "block";
    dialogbox.style.display = "block";
    alertHeader.style.display = "block";

    if (typeof title === "undefined") {
      alertHeader.style.display = "none";
    } else {
      alertHeader.innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' +
        title +
        '<button id="fechaModal">X</button>';
    }
  };

  this.closeModal = function () {
    // Função para fechar o modal
    var dialogbox = document.getElementById("dialogbox2");
    var overlay = document.getElementById("overlay");

    dialogbox.style.display = "none";
    overlay.style.display = "none";
  };

  this.alert = function (title) {
    // Função para exibir o modal de alerta
    if (!document.getElementById("overlay")) {
      this.createModal();
    }

    this.displayModal(title);

    var alertHeader = document.getElementById("alertHeader");
    var alertBody = document.getElementById("alertBody");
    var alertFooter = document.getElementById("alertFooter");

    alertHeader.innerHTML =
      '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' +
      title +
      '<button id="fechaModal">X</button>';

    alertBody.innerHTML =
      '<div class="input-container">' +
      '<p class="modalp">Título:</p>' +
      '  <input type="text" id="input1" class="inputmodal"  placeholder="O que você precisa?">' +
      "</div>" +
      '<div class="input-container">' +
      '<p class="modalp">Categoria:</p>' +
      '  <select id="dropdown">' +
      '    <option selected value="0">Selecione</option>' +
      '    <option value="Dúvida">Dúvida</option>' +
      '    <option value="Dica">Dica</option>' +
      "  </select>" +
      "</div>" +
      '<div class="input-container">' +
      '<p class="modalp">Descrição</p>' +
      '  <input type="text" id="input2" class="inputmodal" placeholder="Dê mais detalhes sobre seu post">' +
      "</div>";

    alertFooter.innerHTML =
      '<button class="pure-material-button-contained active" id="okbtn">OK</button>';

    document.getElementById("fechaModal").onclick = () => {
      this.closeModal();
    };

    document.getElementById("okbtn").onclick = () => {
      var tituloInput = document.getElementById("input1").value;
      var categoriaInput = document.getElementById("dropdown").value;
      var descInput = document.getElementById("input2").value;
      if (tituloInput != 0 && categoriaInput != 0 && descInput != 0) {
        var post = {
          titulo: tituloInput,
          categoria: categoriaInput,
          descricao: descInput,
        };

        var posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.push(post);

        localStorage.setItem("posts", JSON.stringify(posts));

        this.closeModal();

        loadPosts();
      } else {
        console.log("error");
      }
    };
  };
}

const customAlert2 = new CustomAlert2();

document.addEventListener("DOMContentLoaded", function () {
  loadPosts();

  const btncriar = document.getElementById("criarPubli");
  btncriar.addEventListener("click", function () {
    customAlert2.alert("Detalhes do post");
  });
});
