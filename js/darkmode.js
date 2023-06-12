var sun = document.getElementById("sun");
const body = document.querySelector("body");
const p = document.querySelector("div.mural > p");
const h1 = document.querySelector("div#texto > h1");

// Verifica o estado do modo escuro no localStorage ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  var darkModeEnabled = localStorage.getItem("darkModeEnabled");

  if (darkModeEnabled === "true") {
    enableDarkMode();
  }
});

// Alterna o modo escuro ao clicar no botão "sun"
sun.onclick = function () {
  sun.classList.toggle("night");

  // Verifica se o modo escuro está ativado
  var darkModeEnabled = localStorage.getItem("darkModeEnabled");

  if (darkModeEnabled === "true") {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
};

// Função para ativar o modo escuro
function enableDarkMode() {
  // Atualiza a classe do botão "sun"
  sun.classList.add("darkToggle");

  // Aplica as alterações de estilo para o modo escuro
  body.style.background = "#1a1a1a";
  p.style.color = "#ffffff";
  body.style.transition = "1s";

  // Armazena o estado do modo escuro no localStorage
  localStorage.setItem("darkModeEnabled", "true");
}

// Função para desativar o modo escuro
function disableDarkMode() {
  // Remove a classe do botão "sun"
  sun.classList.remove("darkToggle");

  // Reverte as alterações de estilo para o modo claro
  body.style.background = "#ffffff";
  p.style.color = "#1a1a1a";
  body.style.transition = "1s";

  // Armazena o estado do modo escuro no localStorage
  localStorage.setItem("darkModeEnabled", "false");
}
