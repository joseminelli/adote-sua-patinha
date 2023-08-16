import settings from "./settings.js";
const userName = document.getElementById("userName");
const userMsg = document.getElementById("userMsg");
const userPic = document.getElementById("userPic");
const userEx = document.getElementById("userEx");
const dropdowncontent = document.querySelector(".dropdown-content-nav");
const SairContaBtn = document.getElementById("sairDiv");
const EditarBtn = document.getElementById("editarDiv");
const contente = document.getElementById("contente");
const overlayrr = document.getElementById("overlayrr");
const fecharEdit = document.getElementById("fecharEdit");
const salvarEdit = document.getElementById("salvarEdit");
const h2Edit = document.getElementById("h2Edit");

var mobile = false;
const senhaDiv = document.getElementById("senhaDiv");
const nomeDiv = document.getElementById("nomeDiv");
const idadeDiv = document.getElementById("idadeDiv");
const telefoneDiv = document.getElementById("telefoneDiv");
const editarpf = document.getElementById("editarpf");
const iconpenvio = document.getElementById("iconpenvio");
iconpenvio.style.display = "none";
contente.style.zIndex = "0";

function toggleClassOnDeviceWidth() {
  var screenWidth = window.innerWidth;
  if (screenWidth < 1200) {
    mobile = true;
  } else {
    mobile = false;
  }
}

async function verificarCookie() {
  try {
    const response = await fetch(`${settings.ApiUrl}/verificarSemCookie`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.redirect) {
        window.location.href = data.redirect;
      } else if (data.id) {
        //userId = data.id;
      }
    } else {
      console.error("Erro ao verificar o cookie:", response.status);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}
async function getUser() {
  try {
    const response = await fetch(`${settings.ApiUrl}/usuario`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Erro ao obter as informações do usuário");
    }
    const usuario = await response.json();

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }
    userPic.src = usuario.image;
    if (!mobile) {
      userMsg.innerHTML = "Bem vindo ‎" + "‎ ";
      userName.innerHTML = " " + usuario.name;
      userEx.innerHTML = "!";
      userPic.style.width = "50px";
      userPic.style.height = "50px";
      userPic.style.marginLeft = "30px";
      userPic.style.marginRight = "0px";
    } else {
      userPic.style.width = "39px";
      userPic.style.height = "39px";
      userPic.style.marginLeft = "0px";
    }
  } catch (error) {
    console.error(error);
  }
}
document.addEventListener("DOMContentLoaded", async function () {
  toggleClassOnDeviceWidth();
  verificarCookie();
  userPic.style.width = "35px";
  userPic.style.height = "35px";

  for (var i = 18; i <= 100; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", i);
    option.textContent = i;
    document.getElementById("idade2").appendChild(option);
  }
  if (window.location.pathname.endsWith("/perfil.html")) {
    const excContaDiv = document.getElementById("excContaDiv");
    const confirmarSenha = document.getElementById("confirmarSenha");
    const senhaConf = document.getElementById("senhaConf");
    const confBtn = document.getElementById("confBtn");
    const pConfir = document.getElementById("pConfir");
    const iconConfir = document.getElementById("iconConfir");
    overlayrr.addEventListener("click", function () {
      overlayrr.classList.toggle("show");
      confirmarSenha.classList.toggle("show");
    });
    excContaDiv.addEventListener("click", async function () {
      confirmarSenha.classList.toggle("show");
      overlayrr.classList.toggle("show");
      confBtn.addEventListener("click", async function () {
        if (senhaConf.value == "") {
          senhaConf.style.borderColor = "red";
          return;
        } else {
          senhaConf.style.borderColor = "#165ea8";
        }
        try {
          const response2 = await fetch(`${settings.ApiUrl}/userPets`, {
            credentials: "include",
          });
  
          if (!response2.ok) {
            throw new Error("Erro ao obter os pets do usuário");
          }
          const userPets = await response2.json();
          if(userPets.length > 0){
            pConfir.innerHTML = "Você não pode excluir sua conta enquanto tiver pets cadastrados!";
            iconConfir.classList.add("fa-exclamation-triangle");
            iconConfir.classList.remove("fa-circle-check");
            confBtn.style.display = "none";
            senhaConf.style.display = "none";
            setTimeout(() => {
              confirmarSenha.classList.toggle("show");
              overlayrr.classList.toggle("show");
              pConfir.innerHTML = "Confirme sua senha para excluir a conta:";
              confBtn.style.display = "block";
              senhaConf.style.display = "block";
            }, 4000);
            return;
          }
          const response = await fetch(`${settings.ApiUrl}/deleteUser`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ senha: senhaConf.value }),
          });

          if (response.ok) {
            iconConfir.classList.add("fa-circle-check");
            iconConfir.classList.remove("fa-exclamation-triangle");
            pConfir.innerHTML = "Conta excluida com sucesso!";
            senhaConf.style.display = "none";
            confBtn.style.display = "none";
            const mensagem = await response.text();
            if (document.location.pathname.endsWith("/perfil.html")) {
              setTimeout(() => {
                window.location.href = "/index.html";
              }, 1500);
            }
          } else {
            console.error("Erro ao salvar os dados:", response.status);
          }
        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      });
    });
  }
  getUser();

  userPic.addEventListener("click", function () {
    dropdowncontent.classList.toggle("show");
    setTimeout(() => {
      dropdowncontent.classList.toggle("transform");
    }, 1);
  });

  SairContaBtn.addEventListener("click", async function () {
    if (dropdowncontent.classList.contains("show")) {
      //window.location.href = "/index.html";
      try {
        const response = await fetch(`${settings.ApiUrl}/logout`, {
          credentials: "include",
        });

        const usuario = await response.json();
        console.log(usuario);

        if (!usuario) {
          throw new Error("Usuário não encontrado");
        } else {
          window.location.href = usuario.redirect;
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  EditarBtn.addEventListener("click", function () {
    contente.classList.toggle("show");
    editarpf.classList.toggle("show");
    overlayrr.classList.toggle("show");

    contente.style.zIndex = "6";
    if (dropdowncontent.classList.contains("show")) {
      dropdowncontent.classList.remove("show");
      setTimeout(() => {
        dropdowncontent.classList.toggle("transform");
      }, 1);
    }
  });

  fecharEdit.addEventListener("click", function () {
    if (contente.classList.contains("show")) {
      contente.classList.toggle("show");
      editarpf.classList.toggle("show");
      overlayrr.classList.toggle("show");
    }
  });

  salvarEdit.addEventListener("click", async function () {
    const senha = document.getElementById("senha");
    const input2 = document.getElementById("input2");
    const idade = document.getElementById("idade2");
    const telefone = document.getElementById("telefone");

    if (senha.value == "" || input2.value == "" || telefone.value == "") {
      if (senha.value == "") {
        senha.style.borderColor = "red";
      } else {
        senha.style.borderColor = "#165ea8";
      }
      if (input2.value == "") {
        input2.style.borderColor = "red";
      } else {
        input2.style.borderColor = "#165ea8";
      }
      if (telefone.value == "") {
        telefone.style.borderColor = "red";
      } else {
        telefone.style.borderColor = "#165ea8";
      }
      return;
    }
    setTimeout(() => {
      getUser();
    }, 200);
    senhaDiv.style.display = "none";
    nomeDiv.style.display = "none";
    idadeDiv.style.display = "none";
    telefoneDiv.style.display = "none";
    salvarEdit.style.display = "none";
    h2Edit.style.display = "none";
    fecharEdit.style.display = "none";
    contente.style.height = "350px";
    contente.style.borderRadius = "24px";
    contente.style.width = "350px";
    editarpf.style.justifyContent = "center";
    editarpf.style.alignItems = "center";
    iconpenvio.style.display = "flex";

    setTimeout(() => {
      contente.classList.toggle("show");
      overlayrr.classList.toggle("show");
      setTimeout(() => {
        senhaDiv.style.display = "block";
        nomeDiv.style.display = "block";
        idadeDiv.style.display = "block";
        telefoneDiv.style.display = "block";
        salvarEdit.style.display = "block";
        h2Edit.style.display = "block";
        fecharEdit.style.display = "block";
        editarpf.style.justifyContent = "right";
        editarpf.style.alignItems = "flex-start";
        contente.style.borderRadius = "10px";
        contente.style.height = "600px";
        if (mobile == true) {
          contente.style.width = "300px";
        } else {
          contente.style.width = "400px";
        }
        editarpf.style.display = "flex";
        iconpenvio.style.display = "none";
      }, 300);
    }, 3000);

    var data = {
      nome: input2.value,
      idade: idade.value,
      telefone: telefone.value,
      senha: senha.value,
    };

    try {
      const response = await fetch(`${settings.ApiUrl}/editarPessoa`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const mensagem = await response.text();
        if (document.location.pathname.endsWith("/perfil.html")) {
          if (document.location.pathname.endsWith("/perfil.html")) {
            setTimeout(() => {
              window.location.href = "/perfil.html";
            }, 1500);
          }
        }
      } else {
        console.error("Erro ao salvar os dados:", response.status);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  });

  window.onclick = function (event) {
    if (
      !event.target.matches("#editarDiv") &&
      !event.target.matches("#myDropdown") &&
      !event.target.matches("#userPic") &&
      !event.target.matches("#sairDiv")
    ) {
      if (dropdowncontent.classList.contains("show")) {
        dropdowncontent.classList.toggle("show");
        setTimeout(() => {
          dropdowncontent.classList.toggle("transform");
        }, 1);
      }
    }
  };
});
