import settings from "./settings.js";

$(document).ready(async function () {
  const malitoLink = $("#malitoLink");
  const loader = $("#loader");
  const hamster = $("#hamster");
  const box = $("#box");

  loader.css("display", "flex");
  hamster.addClass("active");

  try {
    const response = await fetch(`${settings.ApiUrl}/mural`);
    const data = await response.json();

    if (data) {
      setTimeout(function () {
        hamster.removeClass("active");
        setTimeout(function () {
          loader.css("display", "none");
        }, 300);
      }, 300);
    } else {
      loader.css("display", "flex");
      hamster.addClass("active");
    }

    const url = new URL(window.location.href);
    const numpet = url.searchParams.get("pet");

    const responseEmail = await fetch(`${settings.ApiUrl}/email/` + numpet, {
      credentials: "include",
    });

    if (responseEmail.ok) {
      const email = await responseEmail.text();
      malitoLink.attr("href", `mailto:${email}`);
    }

    const petInfo = data.pets.find((pet) => pet.id == numpet);

    if (petInfo) {
      const dataCadastro = $("#dataCadastro");
      const data = $("#data");

      if (!petInfo.data) {
        dataCadastro.css("display", "none");
      }

      box.css("justify-content", "left");
      const picElement = $("#imagem");
      const picElement2 = $("#imagem2");
      const celElement = $("#desc");
      const bairroElement = $("#raca");
      const idadeElement = $("#idade");
      const nomeElement = $("#name");
      data.html("Data de cadastro: " +"  " + petInfo.data);
      nomeElement.html(petInfo.name);
      idadeElement.html(petInfo.age + " anos");
      bairroElement.html(petInfo.raca);
      celElement.html(petInfo.description);
      picElement.attr("src", petInfo.image);

      if (petInfo.image2) {
        picElement2.attr("src", petInfo.image2);
      } else {
        picElement2.css("display", "none");
      }
    } else {
      box.css("justify-content", "center");
      box.html(
        "<div id='erro404'><div><h2 id='h2Erro'>Algo deu errado</h2><p id='pErro'>O pet escolhido não foi encontrado</p></div><img id='imagemErro' src='./img/4042.png'></div>"
      );

      const darkModeEnabled = localStorage.getItem("darkModeEnabled");
      if (darkModeEnabled === "true") {
        $("#h2Erro").css("color", "#fff");
        $("#pErro").css("color", "#fff");
      }
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
});
