import settings from "./settings.js";

const section = document.getElementById("modalNovo"),
  overlay = document.querySelector(".overlay"),
  closeBtn = document.querySelector(".close-btn"),
  titulom = document.getElementById("titulom"),
  descm = document.getElementById("descm"),
  modalbtn = document.getElementById("modalbtn"),
  iconm = document.getElementById("iconm"),
  logintxt = document.getElementById("logintxt"),
  content = document.getElementById("content");

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
  function addListener(input) {
    input.addEventListener("keyup", () => {
      const code = parseInt(input.value);
      if (code >= 0 && code <= 9) {
        const n = input.nextElementSibling;
        if (n) n.focus();
      } else {
        input.value = "";
      }

      const key = event.key; // const {key} = event; ES6+
      if (key === "Backspace" || key === "Delete") {
        const prev = input.previousElementSibling;
        if (prev) prev.focus();
      }
    });
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
          logintxt.innerHTML = "Verificação";
          content.innerHTML = `
        <div id="modalVerificação">
          <div id="verfIcon">
            <i class="fa-solid fa-lock"></i>
            <div id="asteriscos">
              <i class="fa-solid fa-asterisk"></i>
              <i class="fa-solid fa-asterisk"></i>
              <i class="fa-solid fa-asterisk"></i>
              <i class="fa-solid fa-asterisk"></i>
            </div>
          </div>
          <p id="verificaçãoP">Mandamos um código no seu email, digite ele abaixo</p>
          <div id='inputvs'>
            <input id='inputv' type='text' maxLength="1" />
            <input id='inputv2' type='text' maxLength="1" />
            <input id='inputv3' type='text' maxLength="1" />
            <input id='inputv4' type='text' maxLength="1" />
          </div>
          <button id="confirmar" type="submit">Confirmar</button>
        </div>
        `;
          const inputs = ["inputv", "inputv2", "inputv3", "inputv4"];
          const confirmar = document.getElementById("confirmar");
          inputs.map((id) => {
            const input = document.getElementById(id);
            addListener(input);
          });
          confirmar.addEventListener("click", async function () {
            const inputValues = inputs.map(
              (id) => document.getElementById(id).value
            );

            if (inputValues.every((value) => value !== "")) {
              const codigo = inputValues.join("");
              console.log(codigo);
            } else {
              section.classList.add("active");
              setTimeout(() => {
                section.classList.remove("active");
              }, 3000);
            }
          });
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
