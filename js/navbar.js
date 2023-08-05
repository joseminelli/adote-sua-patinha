const userName = document.getElementById("userName");
const userMsg = document.getElementById("userMsg");
const userPic = document.getElementById("userPic");
const userEx = document.getElementById("userEx");
const dropdowncontent = document.querySelector(".dropdown-content-nav");
const SairContaBtn = document.getElementById("SairContaBtn");

function toggleClassOnDeviceWidth() {
  var screenWidth = window.innerWidth;
  if (screenWidth < 800) {
    mobile = true;
  } else {
    mobile = false;
  }
}

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

document.addEventListener("DOMContentLoaded", async function () {
  toggleClassOnDeviceWidth();
  verificarCookie();

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  try {
    const response = await fetch("https://api.adotesuapatinha.com/usuario", {
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
      userPic.style.width = "35px";
      userPic.style.height = "35px";
      userPic.style.marginLeft = "0px";
      userPic.style.marginRight = "10px";
    }
  } catch (error) {
    console.error(error);
  }

  userPic.addEventListener("click", function () {
    dropdowncontent.classList.toggle("show");
    setTimeout(() => {
      dropdowncontent.classList.toggle("transform");
    }, 1);
  });

  SairContaBtn.addEventListener("click", function () {
    deleteCookie("userId");
    window.location.href = "/index.html";
  });

  window.onclick = function (event) {
    if (
      !event.target.matches("#editarDiv") &&
      !event.target.matches("#myDropdown") &&
      !event.target.matches("#userPic") &&
      !event.target.matches("#sairDiv")
    ) {
      console.log("teste");
      if (dropdowncontent.classList.contains("show")) {
        dropdowncontent.classList.toggle("show");
        setTimeout(() => {
          dropdowncontent.classList.toggle("transform");
        }, 1);
      }
    }
  };
});
