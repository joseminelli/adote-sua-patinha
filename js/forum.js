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
        "<h3>" +
        post.titulo +
        "</h3>" +
        "<p>Categoria: " +
        post.categoria +
        "</p>" +
        "<p>" +
        post.descricao +
        "</p>";

      content.appendChild(postElement);
    });

    var deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var index = parseInt(button.getAttribute("data-index"));
        deletePost(index);
      });
    });
  }
}

function deletePost(index) {
  var posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
  loadPosts();
}

function CustomAlert2() {
  this.alert = function (title) {
    document.body.innerHTML +=
      '<div id="overlay" class="animado"></div><div id="dialogbox2" class="slit-in-vertical"><div><div id="alertHeader"></div><div id="alertBody"></div><div id="alertFooter"></div></div></div>';

    let overlay = document.getElementById("overlay");
    let dialogbox = document.getElementById("dialogbox2");

    let winH = window.innerHeight;
    overlay.style.height = winH + "px";

    overlay.style.display = "block";
    dialogbox.style.display = "block";

    document.getElementById("alertHeader").style.display = "block";

    if (typeof title === "undefined") {
      document.getElementById("alertHeader").style.display = "none";
    } else {
      document.getElementById("alertHeader").innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' +
        title +
        '<button id="fechaModal">X</button>';
    }

    document.getElementById("alertBody").innerHTML =
      '<div class="input-container">' +
      '<p class="modalp">Título:</p>' +
      '  <input type="text" id="input1" class="inputmodal"  placeholder="Digite o Título">' +
      "</div>" +
      '<div class="input-container">' +
      '<p class="modalp">Categoria:</p>' +
      '  <select id="dropdown">' +
      '    <option selected value="0">Selecione</option>' +
      '    <option value="duvida">Dúvida</option>' +
      '    <option value="dica">Dica</option>' +
      "  </select>" +
      "</div>" +
      '<div class="input-container">' +
      '<p class="modalp">Descrição</p>' +
      '  <input type="text" id="input2" class="inputmodal">' +
      "</div>";

    document.getElementById("alertFooter").innerHTML =
      '<button class="pure-material-button-contained active" id="okbtn">OK</button>';

    document.getElementById("fechaModal").onclick = function () {
      document.getElementById("dialogbox2").style.display = "none";
      document.getElementById("overlay").style.display = "none";
    };

    document.getElementById("okbtn").onclick = function () {
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

        document.getElementById("dialogbox2").style.display = "none";
        document.getElementById("overlay").style.display = "none";

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
