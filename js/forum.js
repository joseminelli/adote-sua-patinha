const section = document.getElementById("modalNovo");
const overlay = document.querySelector(".overlay");
const showBtn = document.querySelector(".show-modal");
const closeBtn = document.querySelector(".close-btn3");
const closeBtn2 = document.querySelector(".close-btn2");
const modal = document.getElementById("modal");
const iconmodal = document.getElementById("iconmodal");
const modalh2 = document.getElementById("modalh2");

const modalp = document.getElementById("modalp");
const titulop = document.getElementById("titulop");
const input1 = document.getElementById("input1");
const dropdownt = document.getElementById("dropdownt");
const dropdown = document.getElementById("dropdown");
const input2 = document.getElementById("input2");
const cancelbtn = document.getElementById("cancelbtn");
const modalbtn = document.getElementById("modalbtn");
const fecharbutton = document.getElementById("limpar");
var mobile = false;
modal.style.height = "500px";
modal.style.width = "500px";

function toggleClassOnDeviceWidth() {
  var container = document.querySelector(".search-wrapper");
  var screenWidth = window.innerWidth;

  if (screenWidth < 800) {
    container.classList.remove("active");
    searchInput.style.color = "#282828";
    mobile = true;
  } else {
    container.classList.add("active");
    searchInput.style.color = "#282828";
    mobile = false;
  }
}

window.addEventListener("load", toggleClassOnDeviceWidth);

if (overlay) {
  var tituloInput2 = document.getElementById("input1");
  var categoriaInput2 = document.getElementById("dropdown");
  var descInput2 = document.getElementById("input2");
  function showModalSuccess() {
    modal.style.height = "250px";
    modal.style.width = "250px";
    titulop.style.display = "none";
    input1.style.display = "none";
    dropdownt.style.display = "none";
    dropdown.style.display = "none";
    input2.style.display = "none";
    cancelbtn.style.display = "none";
    modalbtn.style.display = "none";
    iconmodal.style.display = "block";
    modalh2.innerHTML = "Post enviado";
    iconmodal.style.marginTop = "20%";
    modalp.style.display = "none";
    setTimeout(function () {
      section.classList.remove("active");
      showModalDetails();
    }, 2000);
  }

  function showModalDetails() {
    modal.style.height = "500px";
    modal.style.width = "500px";
    titulop.style.display = "block";
    input1.style.display = "block";
    dropdownt.style.display = "block";
    dropdown.style.display = "block";
    input2.style.display = "block";
    cancelbtn.style.display = "inline-block";
    modalbtn.style.display = "inline-block";
    iconmodal.style.display = "none";
    modalh2.innerHTML = "Detahes do post";
    modalp.style.display = "block";
  }

  overlay.addEventListener("click", () => section.classList.remove("active"));
  closeBtn2.addEventListener("click", () => section.classList.remove("active"));
  closeBtn.addEventListener("click", () => {
    console.log("clicou");
    var tituloInput = document.getElementById("input1").value;
    var categoriaInput = document.getElementById("dropdown").value;
    var descInput = document.getElementById("input2").value;
    if (tituloInput != "" && categoriaInput != 0 && descInput != "") {
      tituloInput2.style.borderColor = "#165ea8";
      var post = {
        titulo: tituloInput,
        categoria: categoriaInput,
        descricao: descInput,
      };
      var posts = JSON.parse(localStorage.getItem("posts")) || [];
      posts.push(post);
      localStorage.setItem("posts", JSON.stringify(posts));

      loadPosts();
      showModalSuccess();
    } else {
      iconmodal.style.display = "none";
      section.classList.add("active");

      modal.classList.add("shake-animation");
      setTimeout(() => {
        modal.classList.remove("shake-animation");
      }, 820);

      if (tituloInput == "") {
        tituloInput2.style.borderColor = "#ff2727";
      }
      if (categoriaInput == 0) {
        categoriaInput2.style.borderColor = "#ff2727";
      } else {
        categoriaInput2.style.borderColor = "#165ea8";
      }
      if (descInput == "") {
        descInput2.style.borderColor = "#ff2727";
      } else {
        descInput2.style.borderColor = "#165ea8";
      }
      return;
    }
  });

  tituloInput2.addEventListener("click", function (event) {
    tituloInput2.style.borderColor = "#165ea8";
  });
  categoriaInput2.addEventListener("click", function (event) {
    categoriaInput2.style.borderColor = "#165ea8";
  });
  descInput2.addEventListener("click", function (event) {
    descInput2.style.borderColor = "#165ea8";
  });
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
      replyContainer.className = "reply-input-container";
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

        if (post.respostas.length > 1) {
          var replyButton = createReplyButton(repliesContainer);
          replyContainer.appendChild(replyButton);
        }
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
function createReplyButton(repliesContainer) {
  var replyButton = document.createElement("button");
  replyButton.className = "reply-toggle-btn";
  replyButton.className = "minimize-btn";
  repliesContainer.querySelectorAll(".reply").forEach(function (reply) {
    reply.classList.add("minimizado");
  });
  replyButton.textContent = "Mostrar respostas";
  var isMinimized = true;

  replyButton.addEventListener("click", function () {
    isMinimized = !isMinimized;

    if (isMinimized) {
      replyButton.textContent = "Mostrar respostas";
      repliesContainer.querySelectorAll(".reply").forEach(function (reply) {
        reply.classList.add("minimizado");
      });
    } else {
      replyButton.textContent = "Minimizar";
      repliesContainer.querySelectorAll(".reply").forEach(function (reply) {
        reply.classList.remove("minimizado");
      });
    }
  });

  return replyButton;
}

document.addEventListener("DOMContentLoaded", function () {
  loadPosts();
  var container = document.getElementById("search-wrapper");
  const btncriar = document.getElementById("criarPubli");
  btncriar.addEventListener("click", function () {
    iconmodal.style.display = "none";
    section.classList.add("active");
  });
  fecharbutton.addEventListener("click", function () {
    if (mobile == true) {
      container.querySelector(".search-input").value = "";
      container.classList.remove("active");
    } else {
      container.querySelector(".search-input").value = "";
    }
  });
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", function () {
    if (!container.classList.contains("active")) {
      container.classList.add("active");
    } else if (
      container.classList.contains("active") &&
      !document.getElementById("input-holder")
    ) {
      container.classList.remove("active");
      container.querySelector(".search-input").value = "";
    }

    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase().trim();
    searchInput.style.color = "#282828";
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
      if (posts.length === 0) {
        noPostsMessage.innerHTML = "Não há publicações";
      } else {
        noPostsMessage.innerHTML = "Não há publicações correspondentes à busca";
      }
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

        if (post.respostas && post.respostas.length <= 1) {
          var repliesContainer = document.createElement("div")
          repliesContainer.className = "replies-container";
          post.respostas.forEach(function (resposta) {
            var replyElement = document.createElement("div");
            replyElement.className = "reply minimizado"; 
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

          if (post.respostas.length > 1) {
            var replyButton = createReplyButton(repliesContainer);
            repliesContainer.appendChild(replyButton);
          }
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
