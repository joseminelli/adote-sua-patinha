const section = document.getElementById("modalNovo"),
overlay = document.querySelector(".overlay"),
showBtn = document.querySelector(".show-modal"),
closeBtn = document.querySelector(".close-btn"),
closeBtn2 = document.querySelector(".close-btn2");
if(overlay){
    overlay.addEventListener("click", () => section.classList.remove("active"));
    closeBtn2.addEventListener("click", () => section.classList.remove("active"));
    closeBtn.addEventListener("click", () => {
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

        loadPosts();
        section.classList.remove("active")
    }else{
      section.classList.add("active")
      return
    }
    
  });
}

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

document.addEventListener("DOMContentLoaded", function () {
  loadPosts();

  const btncriar = document.getElementById("criarPubli");
  btncriar.addEventListener("click", function () {
    section.classList.add("active")
  });
});
