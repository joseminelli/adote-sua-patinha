import settings from "./settings.js";

const section = document.getElementById("modalNovo"),
  overlay = document.querySelector(".overlay"),
  closeBtn = document.querySelector(".close-btn"),
  titulom = document.getElementById("titulom"),
  descm = document.getElementById("descm"),
  modalbtn = document.getElementById("modalbtn"),
  iconm = document.getElementById("iconm");
iconm.innerHTML = '<i class="fas fa-circle-xmark"></i>';
const email = document.getElementById("input1");
const recuperar = document.getElementById("login");
document.addEventListener("DOMContentLoaded", async function () {
  if (overlay) {
    overlay.addEventListener("click", () => section.classList.remove("active"));
    if (closeBtn) {
      closeBtn.addEventListener("click", () =>
        section.classList.remove("active")
      );
    }
  }
  recuperar.addEventListener("click", async function () {
    const email2 = email.value;

    if (email2 === "") {
      section.classList.add("active");
      setTimeout(() => {
        section.classList.remove("active");
      }, 3000);
      return;
    } else {
      const response = await fetch(`${settings.ApiUrl}/checkEmail/${email2}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data == true) {
        const response2 = await fetch(
          `${settings.ApiUrl}/enviarCodigo/${email2}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response2.json();
        if (result == true) {
          console.log(data + " sucesso");
        } else {
          console.log(data + " falha");
        }
      } else {
        titulom.innerHTML = "Devagar aí!";
        descm.innerHTML = "O email informado não é cadastrado";
        iconm.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        modalbtn.innerHTML = "Ok";
        section.classList.add("active");
        setTimeout(() => {
          section.classList.remove("active");
          setTimeout(() => {
            titulom.innerHTML = "Formulário não enviado";
            descm.innerHTML = "Você precisa preencher todos os campos";
            iconm.innerHTML = '<i class="fas fa-circle-xmark"></i>';
            modalbtn.innerHTML = "Ok, vou verificar";
          }, 100);
        }, 3000);
      }
    }
  });
});
