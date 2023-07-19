const section = document.getElementById("modalNovo"),
  section2 = document.getElementById("modalNovo2"),
  closeBtn2 = document.querySelector(".close-btn2"),
  closeBtn = document.querySelector(".close-btn"),
  overlay = document.querySelector(".overlay");

overlay.addEventListener("click", () => section.classList.remove("active"));
closeBtn.addEventListener("click", () => {
  section.classList.remove("active");
});
closeBtn2.addEventListener("click", () => {
  section2.classList.remove("active");
});

function getUserIdFromCookie() {
  const cookies = document.cookie.split(";"); 

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith("userId=")) {
      const userId = cookie.substring("userId=".length);
      return userId;
    }
  }

  return null; 
}

const response = await fetch(
  "https://adotesuapatinhaapi.azurewebsites.net/usuario",
  { credentials: "include" }
);
if (!response.ok) {
  throw new Error("Erro ao obter as informações do usuário");
}
const usuario = await response.json();

const userId = getUserIdFromCookie();
function mandarEmail() {
  var params = {
    nome: document.getElementById("input-name").value,
    email: document.getElementById("input-email").value,
    mensagem: document.getElementById("input-message").value,
  };
  const nomev = document.getElementById("input-name").value;
  const emailv = document.getElementById("input-email").value;
  const mensagemv = document.getElementById("input-message").value;
  if (nomev == "" || emailv == "" || mensagemv == "") {
    section.classList.add("active");
  } else if (!emailv.includes("@") || !emailv.includes(".")) {
    section.classList.add("active");
  } else {
    section2.classList.add("active");
    var message;
    const discordWebhookURL =
      "https://discord.com/api/webhooks/1131327581459845292/AiE7O5HDjrv84eRO4TOuS_kkO3f3RfcbSndJXS1RSr4idOCPmqyf7JTbZ8IwharG_lbI";
        if(userId){
             message = `Nome: ${params.nome}\nEmail: ${params.email}\nMensagem: ${params.mensagem}\nUser ID: ${userId}`;
        } else {
             message = `Nome: ${params.nome}\nEmail: ${params.email}\nMensagem: ${params.mensagem}\nUser ID: Não identificado`;
        }
      
    fetch(discordWebhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao enviar a mensagem para o Discord.");
        }
        console.log("Mensagem enviada para o Discord com sucesso!");

        document.getElementById("input-name").value = "";
        document.getElementById("input-email").value = "";
        document.getElementById("input-message").value = "";
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
