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
let userId;
modal.style.height = "500px";
modal.style.width = "500px";

async function verificarCookie() {
  try {
    const response = await fetch(
      "https://api.adotesuapatinha.com/verificarSemCookie",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.redirect) {
        window.location.href = data.redirect;
      } else if (data.id) {
        userId = data.id;
        console.log("Usuário logado:", userId);
      }
    } else {
      console.error("Erro ao verificar o cookie:", response.status);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

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
    modalh2.innerHTML = "Detalhes do post";
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

      var discordWebhookURL =
        "https://discord.com/api/webhooks/1133197179239022602/8wP1pw_p9irBMw6KepZYW3H7E3UPeHBu9z9n0bpYbHgpgoPFPe4LPScjK-XMh5zoJ-cd";

      var formData = new FormData();
      formData.append(
        "content",
        "> **NOVO POST:**" +
          "\n\nTítulo: " +
          tituloInput +
          "\n" +
          "Categoria: " +
          categoriaInput +
          "\n" +
          "Descrição: " +
          descInput +
          "\n"
      );
      fetch(discordWebhookURL, {
        method: "POST",
        body: formData,
      });

      fetch("https://api.adotesuapatinha.com/salvarPost", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Post enviado com sucesso");
            loadPosts();
            showModalSuccess();
          } else {
            console.log("Erro ao enviar o post");
          }
        })
        .catch((error) => {
          console.error(error);
        });
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

function loadPosts() {
  fetch("https://api.adotesuapatinha.com/posts", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((posts) => {
      var content = document.querySelector(".content");
      var noPostsMessage = document.getElementById("noPostsMessage");

      content.innerHTML = "";

      if (posts.length === 0) {
        noPostsMessage.innerHTML = "Não há publicações";
        content.style.display = "none";
      } else {
        noPostsMessage.innerText = "";
        content.style.display = "block";

        posts.forEach(function (post) {
          var postElement = document.createElement("div");
          postElement.className = "post";
          postElement.innerHTML =
            "<h3 id='forumh3'>" +
            post.titulo +
            "</h3>" +
            "<p>Categoria: " +
            post.categoria +
            "</p>" +
            "<p>" +
            post.descricao +
            "</p>";
            console.log(post.userId);
            console.log(userId);
            if (post.userId == userId) {
              console.log("iddd do post: " + post.userId);
              postElement.innerHTML =
                '<div class="dropdown"> <ul class="dropbtn icons btn-right showLeft"> <li></li> <li></li> <li></li>  </ul> <div id="myDropdown" class="dropdown-content"> <p class="deleteBtn" data-id="' +
                post.id +
                '" >Apagar post</p> </div>  </div>  </div>' +
                "<h3 id='forumh3'>" +
                post.titulo +
                "</h3>" +
                "<p>Categoria: " +
                post.categoria +
                "</p>" +
                "<p>" +
                post.descricao +
                "</p>";
            } else {
              console.log("id do post: " + post.userId);
              postElement.innerHTML =
                "<h3 id='forumh3'>" +
                post.titulo +
                "</h3>" +
                "<p>Categoria: " +
                post.categoria +
                "</p>" +
                "<p>" +
                post.descricao +
                "</p>";
            }
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
                resposta.autor +
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
            var id = button.getAttribute("data-id");
            deletePost(id);
            console.log(id);
          });
        });

        var dropdownbtns = document.querySelectorAll(".dropdown");
        var dropdowncontents = document.querySelectorAll(".dropdown-content");

        dropdownbtns.forEach(function (button, index) {
          button.addEventListener("click", function () {
            dropdowncontents[index].classList.toggle("show");
            setTimeout(() => {
              dropdowncontents[index].classList.toggle("transform");
            }, 1);
          });
        });

        var replyButtons = document.querySelectorAll(".reply-btn");
        replyButtons.forEach(function (button) {
          button.addEventListener("click", function () {
            var postElement = button.parentNode.parentNode;
            var replyInput = postElement.querySelector(".reply-input");
            var replyText = replyInput.value.trim();
            if (replyText !== "") {
              var postId = postElement
                .querySelector(".deleteBtn")
                .getAttribute("data-id");
              var replyPost = {
                descricao: replyText,
              };

              var discordWebhookURL =
                "https://discord.com/api/webhooks/1133197179239022602/8wP1pw_p9irBMw6KepZYW3H7E3UPeHBu9z9n0bpYbHgpgoPFPe4LPScjK-XMh5zoJ-cd";

              var formData = new FormData();
              formData.append(
                "content",
                "> **NOVA RESPOSTA:**" +
                  "\n\nDescrição: " +
                  replyText +
                  "\n" +
                  "Post: " +
                  postId
              );
              fetch(discordWebhookURL, {
                method: "POST",
                body: formData,
              });
              fetch(
                `https://api.adotesuapatinha.com/posts/${postId}/respostas`,
                {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(replyPost),
                }
              )
                .then((response) => {
                  if (response.ok) {
                    console.log("Resposta enviada com sucesso");
                    loadPosts();
                    replyInput.value = "";
                  } else {
                    console.log("Erro ao enviar a resposta");
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          });
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

var nomeresp = localStorage.getItem("nome2");

function deletePost(id) {
  var discordWebhookURL =
    "https://discord.com/api/webhooks/1133197179239022602/8wP1pw_p9irBMw6KepZYW3H7E3UPeHBu9z9n0bpYbHgpgoPFPe4LPScjK-XMh5zoJ-cd";

  var formData = new FormData();
  formData.append("content", "> **POST DELETADO**" + "\n\n Post ID: " + id);
  fetch(discordWebhookURL, {
    method: "POST",
    body: formData,
  });
  fetch(`https://api.adotesuapatinha.com/posts/${id}`, {
    credentials: "include",
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Post excluído com sucesso");
        loadPosts();
      } else if (response.status === 403) {
        console.log("Acesso negado para excluir o post");
      } else if (response.status === 404) {
        console.log("Post não encontrado");
      } else {
        console.log("Erro ao excluir o post");
      }
    })
    .catch((error) => {
      console.error(error);
    });
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
  verificarCookie();

  loadPosts();
  document.addEventListener("click", handleClickOutside);
  var container = document.getElementById("search-wrapper");
  const btncriar = document.getElementById("criarPubli");
  btncriar.addEventListener("click", function () {
    iconmodal.style.display = "none";
    section.classList.add("active");
  });
  if (mobile == true) {
    container.classList.remove("active");
  }
  fecharbutton.addEventListener("click", function () {
    container.querySelector(".search-input").value = "";
  });

  function handleClickOutside(event) {
    if (
      mobile == true &&
      !container.contains(event.target) &&
      event.target !== fecharbutton &&
      event.target !== searchButton
    ) {
      container.classList.remove("active");
    }
    if (mobile == false) {
      container.classList.add("active");
    }
  }
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", function () {
    if (!container.classList.contains("active")) {
      setTimeout(function () {
        container.classList.add("active");
      }, 100);
    } else if (
      container.classList.contains("active") &&
      !document.getElementById("input-holder")
    ) {
      container.classList.remove("active");
      container.querySelector(".search-input").value = "";
    }
    const searchWrapper = document.getElementById("search-wrapper");

    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase().trim();
    searchInput.style.color = "#282828";
    if (searchWrapper.classList.contains("active")) {
      fetch(`https://api.adotesuapatinha.com/posts?search=${searchTerm}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((posts) => {
          var content = document.querySelector(".content");
          var noPostsMessage = document.getElementById("noPostsMessage");
          console.log(posts);
          content.innerHTML = "";

          if (posts.length === 0) {
            noPostsMessage.innerHTML =
              "Não há publicações correspondentes à busca";
            content.style.display = "none";
          } else {
            noPostsMessage.innerHTML = "";
            content.style.display = "block";
            posts.forEach(function (post) {
              var postElement = document.createElement("div");
              postElement.className = "post";
              postElement.innerHTML =
                "<h3 id='forumh3'>" +
                post.titulo +
                "</h3>" +
                "<p>Categoria: " +
                post.categoria +
                "</p>" +
                "<p>" +
                post.descricao +
                "</p>";
                console.log(post.userId);
                console.log(userId);
                if (post.userId == userId) {
                  postElement.innerHTML =
                    '<div class="dropdown"> <ul class="dropbtn icons btn-right showLeft"> <li></li> <li></li> <li></li>  </ul> <div id="myDropdown" class="dropdown-content"> <p class="deleteBtn" data-id="' +
                    post.id +
                    '" >Apagar post</p> </div>  </div>  </div>' +
                    "<h3 id='forumh3'>" +
                    post.titulo +
                    "</h3>" +
                    "<p>Categoria: " +
                    post.categoria +
                    "</p>" +
                    "<p>" +
                    post.descricao +
                    "</p>";
                } else {
                  postElement.innerHTML =
                    "<h3 id='forumh3'>" +
                    post.titulo +
                    "</h3>" +
                    "<p>Categoria: " +
                    post.categoria +
                    "</p>" +
                    "<p>" +
                    post.descricao +
                    "</p>";
                }
              var replyContainer = document.createElement("div");
              replyContainer.className = "reply-container";
              replyContainer.className = "reply-input-container";
              replyContainer.innerHTML =
                '<p class="modalp2">Responder:</p>' +
                '<input type="text" class="inputmodal2 reply-input" placeholder="Digite sua resposta">' +
                '<button id="responder" class="pure-material-button-contained active reply-btn">Responder</button>';

              postElement.appendChild(replyContainer);

              content.appendChild(postElement);

              if (post.respostas && post.respostas.length >= 1) {
                var repliesContainer = document.createElement("div");
                repliesContainer.className = "replies-container";
                post.respostas.forEach(function (resposta) {
                  var replyElement = document.createElement("div");
                  replyElement.className = "reply minimizado";
                  replyElement.innerHTML =
                    "<p id='nomerply'>" +
                    resposta.autor +
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
                var id = button.getAttribute("data-id");
                deletePost(id);
                console.log(id);
              });
            });

            var dropdownbtns = document.querySelectorAll(".dropdown");
            var dropdowncontents =
              document.querySelectorAll(".dropdown-content");

            dropdownbtns.forEach(function (button, index) {
              button.addEventListener("click", function () {
                dropdowncontents[index].classList.toggle("show");
                setTimeout(() => {
                  dropdowncontents[index].classList.toggle("transform");
                }, 1);
              });
            });
            var replyButtons = document.querySelectorAll(".reply-btn");
            replyButtons.forEach(function (button) {
              button.addEventListener("click", function () {
                var postElement = button.parentNode.parentNode;
                var replyInput = postElement.querySelector(".reply-input");
                var replyText = replyInput.value.trim();
                if (replyText !== "") {
                  var postId = postElement
                    .querySelector(".deleteBtn")
                    .getAttribute("data-id");
                  var replyPost = {
                    descricao: replyText,
                  };

                  fetch(
                    `https://api.adotesuapatinha.com/posts/${postId}/respostas`,
                    {
                      method: "POST",
                      credentials: "include",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(replyPost),
                    }
                  )
                    .then((response) => {
                      if (response.ok) {
                        console.log("Resposta enviada com sucesso");
                        loadPosts();
                        replyInput.value = "";
                      } else {
                        console.log("Erro ao enviar a resposta");
                      }
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }
              });
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
          openDropdown.classList.remove("transform");
        }
      }
    }
  };
});
