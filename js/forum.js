const section = document.getElementById("modalNovo");
const overlay = document.querySelector(".overlay");
const showBtn = document.querySelector(".show-modal");
const closeBtn = document.querySelector(".close-btn3");
const closeBtn2 = document.querySelector(".close-btn2");
const modal = document.getElementById("modal");

if (overlay) {
  // Código existente omitido para brevidade
}

var login = localStorage.getItem("login");

if (login != "true") {
  window.location.href = "index.html";
}

function loadPosts() {
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
        '<button id="responder" class="pure-material-button-contained active reply-btn">Responder</button>';

      postElement.appendChild(replyContainer);

      content.appendChild(postElement);

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

    var deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var index = parseInt(button.getAttribute("data-index"));
        deletePost(index);
      });
    });

    var replyButtons = document.querySelectorAll(".reply-btn");
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
  var posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
  loadPosts();
}

document.addEventListener("DOMContentLoaded", function () {
  loadPosts();

  const clearInput = () => {
    const input = document.getElementsById("searchInput")[0];
    input.value = "";
  }
  
  const clearBtn = document.getElementById("clear-btn");
  clearBtn.addEventListener("click", clearInput);

  
  const btncriar = document.getElementById("criarPubli");
  btncriar.addEventListener("click", function () {
    section.classList.add("active");
  });

  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", function () {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase().trim();

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const filteredPosts = posts.filter(function (post) {
      const titulo = post.titulo.toLowerCase();
      const categoria = post.categoria.toLowerCase();
      const descricao = post.descricao.toLowerCase();
      return (
        titulo.includes(searchTerm) ||
        categoria.includes(searchTerm) ||
        descricao.includes(searchTerm)
      );
    });

    var content = document.querySelector(".content");
    content.innerHTML = "";

    if (filteredPosts.length === 0) {
      const noPostsMessage = document.getElementById("noPostsMessage");
      noPostsMessage.innerHTML = "Não há publicações correspondentes à busca";
      content.style.display = "none";
    } else {
      noPostsMessage.innerHTML = "";
      content.style.display = "block";
      filteredPosts.forEach(function (post, index) {
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
          '<button id="responder" class="pure-material-button-contained active reply-btn">Responder</button>';

        postElement.appendChild(replyContainer);

        content.appendChild(postElement);

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

      var deleteButtons = document.querySelectorAll(".deleteBtn");
      deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          var index = parseInt(button.getAttribute("data-index"));
          deletePost(index);
        });
      });

      var replyButtons = document.querySelectorAll(".reply-btn");
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
  });
});
