import settings from "./settings.js";

$(document).ready(async function () {
  const malitoLink = $("#malitoLink");
  const loader = $(".loader2");
  const box = $("#box");
  const loadingimage = $("#loading-image");
  try {
    const response = await fetch(`${settings.ApiUrl}/mural`);
    const data = await response.json();

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
      data.html("Data de cadastro: " + "  " + petInfo.data);
      loadingimage.css("display", "none");
      loader.css("display", "none");
      nomeElement.css("display", "block");
      idadeElement.css("display", "block");
      bairroElement.css("display", "block");
      celElement.css("display", "block");
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
    const shareData = {
      title: `Adote ${petInfo.name}!`	,
      text: `Olá, estou compartilhando o perfil do ${petInfo.name} para que você possa adotá-lo!`,
      url: `https://www.adotesuapatinha.com.br/perfilpf.html?pet=${numpet}`,
    };
    $("#compartilhar").click(function () {
      if (navigator.share) {
        navigator
          .share(shareData)
          .then(() => {
            $("#resultPara").text("MDN shared successfully");
          })
          .catch((error) => {
            $("#resultPara").text(`Error: ${error}`);
          });
      } else {
        $("#resultPara").text("Web Share API not supported in this browser.");
      }
    });
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
  
});
