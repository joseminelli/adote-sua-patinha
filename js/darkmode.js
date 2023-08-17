$(document).ready(function() {
  var sun = $("#sun"),
    transitionTime = 0.6,
    pictureElements = $(".picture"),
    body = $("body"),
    p = $("div.mural > p"),
    h1Sobre = $("section#formm > h1"),
    h2Sobre = $("section#faq > h2"),
    h2Contato = $("div.cf > h2"),
    logintxt = $("#logintxt"),
    noPostsMessage = $("#noPostsMessage"),
    npet = $("#npet"),
    iconProcura = $("#searchButton"),
    inputProcura = $("#searchInput"),
    currentPage = $("#currentPage"),
    dataCadastro = $("#data");
    inputsobre = $(".inputsobre");

  var darkModeEnabled = localStorage.getItem("darkModeEnabled");

  if (darkModeEnabled === "true") {
    transitionTime = 0;
    enableDarkMode();
    if (sun) {
      sun.toggleClass("night");
    }
  }

  if (sun) {
    sun.click(function() {
      sun.toggleClass("night");
      var darkModeEnabled = localStorage.getItem("darkModeEnabled");

      if (darkModeEnabled === "true") {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  }

  function enableDarkMode() {
    var h2Erro = $("#h2Erro");
    var pErro = $("#pErro");

    if (sun) {
      sun.addClass("darkToggle");
    }
    body.css("background", "#282828");
    body.css("transition", transitionTime + "s");
    localStorage.setItem("darkModeEnabled", "true");
    
    if (p) {
      p.css("color", "#ffffff");
    }
    if (dataCadastro) {
      dataCadastro.css("color", "#fff")
    }
    if (inputsobre) {
      inputsobre.css("color", "#fff")
      inputsobre.css("background", "#282828")
    }
    if (iconProcura) {
      iconProcura.css("color", "#ffffff");
    }
    if (inputProcura) {
      inputProcura.css("color", "#ffffff");
    }
    if (h1Sobre) {
      h1Sobre.css("color", "#ffffff");
    }
    if (h2Sobre) {
      h2Sobre.css("color", "#ffffff");
    }
    if (h2Contato) {
      h2Contato.css("color", "#ffffff");
    }
    if (pictureElements) {
      pictureElements.each(function() {
        $(this).css("transition", transitionTime + "s");
        $(this).css("background-color", "#353535");
        $(this).css("border-color", "#fff");
      });
    }
    if (logintxt) {
      logintxt.css("color", "#ffffff");
    }
    if (currentPage) {
      currentPage.css("color", "#ffffff");
    }
    if (npet) {
      npet.css("color", "#ffffff");
    }
    if (h2Erro) {
      h2Erro.css("color", "#ffffff");
    }
    if (pErro) {
      pErro.css("color", "#ffffff");
    }
    if (noPostsMessage) {
      noPostsMessage.css("color", "#ffffff");
    }
    transitionTime = 0.6;
  }

  function disableDarkMode() {
    var h2Erro = $("#h2Erro");
    var pErro = $("#pErro");
    sun.removeClass("darkToggle");
    body.css("background", "#ffffff");
    body.css("transition", transitionTime + "s");
    localStorage.setItem("darkModeEnabled", "false");

    if (p) { 
      p.css("color", "#282828");
    }
    if (pictureElements) {
      pictureElements.each(function() {
        $(this).css("transition", transitionTime + "s");
        $(this).css("background-color", "#ddd");
        $(this).css("border-color", "#9e9e9e");
      });
    }
    if (iconProcura) {
      iconProcura.css("color", "#282828");
    }
    if (inputProcura) {
      inputProcura.css("color", "#282828");
    }
    if (inputsobre) {
      inputsobre.css("color", "#282828")
      inputsobre.css("background", "#fff")
    }
    if (h1Sobre) {
      h1Sobre.css("color", "#282828");
    }
    if (h2Sobre) {
      h2Sobre.css("color", "#282828");
    }
    if (npet) {
      npet.css("color", "#282828");
    }
    if (h2Contato) {
      h2Contato.css("color", "#282828");
    }
    if (h2Erro) {
      h2Erro.css("color", "#282828");
    }
    if (dataCadastro) {
      dataCadastro.css("color", "#282828")
    }
    if (pErro) {
      pErro.css("color", "#282828");
    }
    if (logintxt) {
      logintxt.css("color", "#282828");
    }
    if (currentPage) {
      currentPage.css("color", "#282828");
    }
    if (noPostsMessage) {
      noPostsMessage.css("color", "#282828");
    }
    transitionTime = 0.6;
  }
});