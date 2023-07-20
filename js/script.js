const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");
const body2 = document.querySelector("body");
const hamster = document.getElementById("hamster");
const loader = document.getElementById("loader");
const titulom = document.getElementById("titulom");
const descm = document.getElementById("descm");
const iconm = document.getElementById("iconm");
const modalbtn = document.getElementById("modalbtn");
const webhookClient =
  "https://discord.com/api/webhooks/1129080775149629441/JxBSeJnGKU-ICbbhkfxKFSjxfHTYo1YvMrkmHO3kBRqqU9eSEhYp7-VHO0525JWehTBk";

const section = document.getElementById("modalNovo"),
  overlay = document.querySelector(".overlay"),
  showBtn = document.querySelector(".show-modal"),
  closeBtn = document.querySelector(".close-btn");
if (bar) {
  document.addEventListener("click", function (e) {
    const navbar = document.getElementById("navbar");
    const clickedElement = e.target;

    if (bar.classList.contains("ativo")) {
      if (!navbar.contains(clickedElement) && clickedElement !== bar) {
        bar.classList.remove("ativo");
        nav.classList.remove("active");
      }
    }
  });
}

async function verificarCookieTF() {
  try {
    const response = await fetch(
      "https://api.adotesuapatinha.com/verificarCookieTF",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (response.ok) {
      const temcookie = await response.text();
      if (temcookie == true) {
        return true;
      } else {
        return false;
      }
    } else {
      console.error("Erro ao verificar o cookie:", response.status);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

async function redirecionarUsuario() {
  try {
    const temCookie = await verificarCookieTF();
    if (temCookie) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erro ao verificar o cookie:", error);
  }
}
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

document.addEventListener("DOMContentLoaded", function () {
  var enviarButton = document.getElementById("enviar"); // Botão de pet
  var enviarButton2 = document.getElementById("enviar2"); // Botão de pessoas
  var loginButton = document.getElementById("login"); // Botão do cadastro de pessoas
  const pictureInput = document.getElementById("picture");

  if (
    document.location.pathname.endsWith("/index.html") ||
    document.location.pathname.endsWith("/")
  ) {
    if (redirecionarUsuario() == "true") {
      window.location.href = "main.html";
    }
  }
  if (overlay) {
    overlay.addEventListener("click", () => section.classList.remove("active"));
    if (closeBtn) {
      closeBtn.addEventListener("click", () =>
        section.classList.remove("active")
      );
    }
  }

  if (bar) {
    bar.addEventListener("click", function (e) {
      nav.classList.toggle("active");
      setTimeout(() => {
        bar.classList.toggle("ativo");
      }, 10);
    });
  }

  if (enviarButton) {
    if (redirecionarUsuario() == "false") {
      window.location.href = "index.html";
    }
    enviarButton.addEventListener("click", async function (event) {
      try {
        const response = await fetch(
          "https://api.adotesuapatinha.com/maxPets",
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Erro ao obter os pets do usuário");
        }

        const userPets = await response.json();
        console.log(userPets.length);
        console.log(userPets);
        if (userPets.length >= 2) {
          alert("Você já cadastrou 2 pets. Não é possível cadastrar mais.");
          return;
        }

        loader.style.display = "flex";
        hamster.classList.add("active");
        event.preventDefault();
        var nome = document.getElementById("input").value;
        var idade = document.getElementById("idade").value;
        var raca = document.getElementById("raca").value;
        var descricao = document.getElementById("descricao").value;
        var especie = document.getElementById("especie").value;

        var nome3 = document.getElementById("input");
        var raca3 = document.getElementById("raca");
        var descricao3 = document.getElementById("descricao");
        var especie3 = document.getElementById("especie");

        var inputImagem = document.getElementById("picture__input");

        descricao3.addEventListener("click", function (event) {
          descricao3.style.borderColor = "#165ea8";
        });
        nome3.addEventListener("click", function (event) {
          nome3.style.borderColor = "#165ea8";
        });
        raca3.addEventListener("click", function (event) {
          raca3.style.borderColor = "#165ea8";
        });
        especie3.addEventListener("click", function (event) {
          especie3.style.borderColor = "#165ea8";
        });

        if (
          nome === "" ||
          descricao === "" ||
          raca === "0" ||
          especie === "0"
        ) {
          if (inputImagem.files && !inputImagem.files[0]) {
            pictureInput.style.borderColor = "#ff2727";
          } else {
            pictureInput.style.borderColor = "#fff";
          }
          if (descricao === "") {
            descricao3.style.borderColor = "#ff2727";
          }
          if (nome === "") {
            nome3.style.borderColor = "#ff2727";
          }

          if (raca === "0") {
            raca3.style.borderColor = "#ff2727";
          }

          if (especie === "0") {
            especie3.style.borderColor = "#ff2727";
          }

          hamster.classList.remove("active");
          loader.style.display = "none";
          section.classList.add("active");
          return;
        }
        var imagemdopet = localStorage.getItem("imagempet");

        if (inputImagem.files && inputImagem.files[0]) {
          var imagem = inputImagem.files[0];

          var reader = new FileReader();

          reader.onload = function (e) {
            var imagemBase64 = e.target.result;

            //localStorage.setItem("imagempet", imagemBase64);

            var formData = new FormData();
            formData.append("file", imagem);
            formData.append("content", "Nome: " + nome + "\nIdade: " + idade + "\nRaça: " + raca + "\nDescrição: " + descricao + "\nEspécie: " + especie);

            var discordWebhookURL =
              "https://discord.com/api/webhooks/1131715085803475035/YgNnzk2MRlOOn6oZLm8db7cfItEgZu7wdofOjq8-Wkl3esCT3m8P_syYf2G0CnuusKtA";

            fetch(discordWebhookURL, {
              method: "POST",
              body: formData,
            })
              .then(function (response) {
                if (!response.ok) {
                  hamster.classList.remove("active");
                  loader.style.display = "none";
                  throw new Error("Erro ao enviar a imagem para o Discord.");
                }
                return response.json();
              })
              .then(function (discordResponse) {
                var imageUrl = discordResponse.attachments[0].url; // Obtém a URL da imagem enviada para o Discord

                var data = {
                  nome: nome,
                  idade: idade,
                  raca: raca,
                  descricao: descricao,
                  especie: especie,
                  imagem: imageUrl,
                };

                fetch(`https://api.adotesuapatinha.com/salvar`, {
                  method: "POST",

                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                })
                  .then(function (response) {
                    if (!response.ok) {
                      hamster.classList.remove("active");
                      section.classList.add("active");
                      loader.style.display = "none";
                      titulom.innerHTML = "Erro ao salvar os dados.";
                      descm.innerHTML = "";
                      iconm.classList.add("fa-circle-check");
                      iconm.classList.remove("fa-circle-xmark");
                      modalbtn.style.display = "none";
                      setTimeout(function () {
                        section.classList.remove("active");
                        titulom.innerHTML = "Formulário não enviado";
                        descm.innerHTML =
                          "Você precisa preencher todos os campos e colocar uma imagem";
                        iconm.classList.remove("fa-circle-check");
                        iconm.classList.add("fa-circle-xmark");
                        modalbtn.style.display = "block";
                      }, 1500);
                      throw new Error("Erro ao salvar os dados.");
                    }
                    return response.text();
                  })
                  .then(function () {
                    document.getElementById("input").value = "";
                    document.getElementById("idade").value = "";
                    document.getElementById("raca").value = "0";
                    document.getElementById("descricao").value = "";
                    document.getElementById("especie").value = "0";
                    document.getElementById("picture__input").value = "";
                    hamster.classList.remove("active");
                    loader.style.display = "none";
                    section.classList.add("active");
                    titulom.innerHTML = "Pet cadastrado!";
                    descm.innerHTML = "";
                    iconm.classList.add("fa-circle-check");
                    iconm.classList.remove("fa-circle-xmark");
                    modalbtn.style.display = "none";
                    setTimeout(function () {
                      section.classList.remove("active");
                      window.location.href = "perfil.html";
                      modalbtn.style.display = "block";
                    }, 1500);
                  })
                  .catch(function (error) {
                    console.error(error);
                    loader.style.display = "none";
                    hamster.classList.remove("active");
                    section.classList.add("active");
                    titulom.innerHTML = "Erro ao salvar os dados.";
                    descm.innerHTML = "";
                    iconm.classList.add("fa-circle-check");
                    iconm.classList.remove("fa-circle-xmark");
                    modalbtn.style.display = "none";
                    setTimeout(function () {
                      section.classList.remove("active");
                      titulom.innerHTML = "Formulário não enviado";
                      descm.innerHTML =
                        "Você precisa preencher todos os campos e colocar uma imagem";
                      iconm.classList.remove("fa-circle-check");
                      iconm.classList.add("fa-circle-xmark");
                      modalbtn.style.display = "block";
                    }, 1500);
                  });
              })
              .catch(function (error) {
                console.error(error);
                loader.style.display = "none";
                hamster.classList.remove("active");
                section.classList.add("active");
                titulom.innerHTML = "Erro ao salvar a imagem.";
                descm.innerHTML = "";
                iconm.classList.add("fa-circle-check");
                iconm.classList.remove("fa-circle-xmark");
                modalbtn.style.display = "none";
                setTimeout(function () {
                  section.classList.remove("active");
                  titulom.innerHTML = "Formulário não enviado";
                  descm.innerHTML =
                    "Você precisa preencher todos os campos e colocar uma imagem";
                  iconm.classList.remove("fa-circle-check");
                  iconm.classList.add("fa-circle-xmark");
                  modalbtn.style.display = "block";
                }, 1500);
              });
          };

          reader.readAsDataURL(imagem);
        } else {
          pictureInput.style.borderColor = "#ff2727";
          section.classList.add("active");
          return;
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar o pet.");
      }
    });
  }
  if (enviarButton2) {
    const apiUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/31/municipios";
      function fillMunicipiosSelect(municipios) {
        const municipiosSelect = document.getElementById("bairro2");

        municipios.forEach((municipio) => {
          const option = document.createElement("option");
          option.value = municipio.nome;
          option.text = municipio.nome;
          municipiosSelect.appendChild(option);
        });
      }
      fetch(apiUrl)
        .then((response) => response.json())
        .then((municipios) => {
          fillMunicipiosSelect(municipios);
        })
        .catch((error) => {
          console.error("Erro ao obter os municípios:", error);
        });
    //enviarButton2.disabled = true;
    if (redirecionarUsuario() == "true") {
      window.location.href = "main.html";
    }
    const pictureInput = document.getElementById("picture");
    var selectIdade = document.getElementById("idade2");
    const emailDiv = document.getElementById("emailDiv");
    const senhaDiv = document.getElementById("senhaDiv");
    if (redirecionarUsuario() == "true") {
      emailDiv.style.display = "none";
      senhaDiv.style.display = "none";
    } else {
      emailDiv.style.display = "block";
      senhaDiv.style.display = "block";
    }
    for (var i = 18; i <= 100; i++) {
      var option = document.createElement("option");
      option.setAttribute("value", i);
      option.textContent = i;
      selectIdade.appendChild(option);
    }
    enviarButton2.addEventListener("click", function (event) {
      event.preventDefault();

      loader.style.display = "flex";
      hamster.classList.add("active");
      const pictureImage = document.querySelector(".picture__image");
      var nome2 = document.getElementById("input2").value;
      var idade2 = document.getElementById("idade2").value;
      var bairro = document.getElementById("bairro2").value;
      var telefone = document.getElementById("telefone").value;
      var email = document.getElementById("email").value;
      var senha = document.getElementById("senha").value;
      
      var nome4 = document.getElementById("input2");
      var bairro2 = document.getElementById("bairro2");
      var telefone2 = document.getElementById("telefone");
      var email2 = document.getElementById("email");
      var senha2 = document.getElementById("senha");
      nome4.addEventListener("click", function (event) {
        nome4.style.borderColor = "#165ea8";
      });
      email2.addEventListener("click", function (event) {
        email2.style.borderColor = "#165ea8";
      });
      senha2.addEventListener("click", function (event) {
        senha2.style.borderColor = "#165ea8";
      });
      telefone2.addEventListener("click", function (event) {
        telefone2.style.borderColor = "#165ea8";
      });
      bairro2.addEventListener("click", function (event) {
        bairro2.style.borderColor = "#165ea8";
      });
      if (redirecionarUsuario() === "true") {
        if (nome2 === "" || telefone === "" || bairro === "0") {
          if (pictureImage.childElementCount !== 1) {
            pictureInput.style.borderColor = "#ff2727";
          } else {
            pictureInput.style.borderColor = "#fff";
          }
          if (nome2 === "") {
            nome4.style.borderColor = "#ff2727";
          }
          if (telefone === "") {
            telefone2.style.borderColor = "#ff2727";
          }
          if (bairro === "0") {
            bairro2.style.borderColor = "#ff2727";
          }
          section.classList.add("active");

          loader.style.display = "none";
          hamster.classList.remove("active");
          return;
        }
      } else {
        if (
          nome2 === "" ||
          telefone === "" ||
          bairro === "0" ||
          email === "" ||
          senha === "" ||
          !validarEmail(email) ||
          pictureImage.childElementCount !== 1
        ) {
          if (pictureImage.childElementCount !== 1) {
            pictureInput.style.borderColor = "#ff2727";
          } else {
            pictureInput.style.borderColor = "#fff";
          }
          if (nome2 === "") {
            nome4.style.borderColor = "#ff2727";
          }
          if (telefone === "") {
            telefone2.style.borderColor = "#ff2727";
          }
          if (senha === "") {
            senha2.style.borderColor = "#ff2727";
          }
          if (email === "" || !validarEmail(email)) {
            email2.style.borderColor = "#ff2727";
          }
          if (bairro === "0") {
            bairro2.style.borderColor = "#ff2727";
          }
          loader.style.display = "none";
          hamster.classList.remove("active");
          section.classList.add("active");
          return;
        }
      }

      if (pictureImage.childElementCount === 1) {
        const imgElement = pictureImage.querySelector("#picture__img");
        if (imgElement) {
          const imagem2 = imgElement.src;

          function dataURItoBlob(dataURI) {
            const byteString = atob(dataURI.split(",")[1]);
            const mimeString = dataURI
              .split(",")[0]
              .split(":")[1]
              .split(";")[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
          }

          var formData = new FormData();
          formData.append("file", dataURItoBlob(imagem2), "imagem.png");
          formData.append("content", "Nome: " + nome2 + "\nIdade: " + idade2 + "\nRegião: " + bairro);

          var discordWebhookURL =
            "https://discord.com/api/webhooks/1131716314889728031/_lFhU4lLLgenA8_7tkfn1LfeJDECfUfs9JPTEyFpK3dIPdG8W24TnNi30Mx8cRPrQzmA";

          fetch(discordWebhookURL, {
            method: "POST",
            body: formData,
          })
            .then(function (response) {
              if (!response.ok) {
                hamster.classList.remove("active");
                loader.style.display = "none";
                throw new Error("Erro ao enviar a imagem para o Discord.");
              }
              return response.json();
            })
            .then(function (discordResponse) {
              var imageUrl = discordResponse.attachments[0].url;

              var data = {
                nome: nome2,
                idade: idade2,
                bairro: bairro,
                telefone: telefone,
                email: email,
                senha: senha,
                imagem: imageUrl,
              };

              fetch(`https://api.adotesuapatinha.com/salvarPessoa`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then(function (response) {
                  if (!response.ok) {
                    hamster.classList.remove("active");
                    section.classList.add("active");
                    loader.style.display = "none";
                    titulom.innerHTML = "Erro ao salvar os dados.";
                    descm.innerHTML = "";
                    iconm.classList.add("fa-circle-check");
                    iconm.classList.remove("fa-circle-xmark");
                    modalbtn.style.display = "none";
                    setTimeout(function () {
                      section.classList.remove("active");
                      titulom.innerHTML = "Formulário não enviado";
                      descm.innerHTML =
                        "Você precisa preencher todos os campos e colocar uma imagem";
                      iconm.classList.remove("fa-circle-check");
                      iconm.classList.add("fa-circle-xmark");
                      modalbtn.style.display = "block";
                    }, 1500);
                    throw new Error("Erro ao salvar os dados.");
                  }
                  return response.text();
                })
                .then(function () {
                  hamster.classList.remove("active");
                  loader.style.display = "none";
                  section.classList.add("active");
                  titulom.innerHTML = "Conta cadastrada!";
                  descm.innerHTML = "";
                  iconm.classList.add("fa-circle-check");
                  iconm.classList.remove("fa-circle-xmark");
                  modalbtn.style.display = "none";
                  setTimeout(function () {
                    section.classList.remove("active");
                    window.location.href = "main.html";
                    modalbtn.style.display = "block";
                  }, 1500);
                })
                .catch(function (error) {
                  console.error(error);
                  loader.style.display = "none";
                  hamster.classList.remove("active");
                  section.classList.add("active");
                  titulom.innerHTML = "Erro ao salvar os dados.";
                  descm.innerHTML = "";
                  iconm.classList.add("fa-circle-check");
                  iconm.classList.remove("fa-circle-xmark");
                  modalbtn.style.display = "none";
                  setTimeout(function () {
                    section.classList.remove("active");
                    titulom.innerHTML = "Formulário não enviado";
                    descm.innerHTML =
                      "Você precisa preencher todos os campos e colocar uma imagem";
                    iconm.classList.remove("fa-circle-check");
                    iconm.classList.add("fa-circle-xmark");
                    modalbtn.style.display = "block";
                  }, 1500);
                });
            })
            .catch(function (error) {
              console.error(error);
              loader.style.display = "none";
              hamster.classList.remove("active");
              section.classList.add("active");
              titulom.innerHTML = "Erro ao salvar a imagem.";
              descm.innerHTML = "";
              iconm.classList.add("fa-circle-check");
              iconm.classList.remove("fa-circle-xmark");
              modalbtn.style.display = "none";
              setTimeout(function () {
                section.classList.remove("active");
                titulom.innerHTML = "Formulário não enviado";
                descm.innerHTML =
                  "Você precisa preencher todos os campos e colocar uma imagem";
                iconm.classList.remove("fa-circle-check");
                iconm.classList.add("fa-circle-xmark");
                modalbtn.style.display = "block";
              }, 1500);
            });
        }
      } else {
        pictureInput.style.borderColor = "#ff2727";
        section.classList.add("active");
        return;
      }
    });
  }
  if (loginButton) {
    const eye = document.querySelector(".feather-eye");
    const eyeoff = document.querySelector(".feather-eye-off");
    const passwordField = document.querySelector("input[type=password]");

    eye.addEventListener("click", () => {
      eye.style.display = "none";
      eyeoff.style.display = "block";

      passwordField.type = "text";
    });

    eyeoff.addEventListener("click", () => {
      eyeoff.style.display = "none";
      eye.style.display = "block";

      passwordField.type = "password";
    });
    loginButton.addEventListener("click", function (event) {
      loader.style.display = "flex";
      hamster.classList.add("active");
      const email = document.getElementById("input1").value;
      const senha = document.getElementById("input2").value;
      fetch(`https://api.adotesuapatinha.com/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.redirect) {
            window.location.href = data.redirect;
          } else {
            loader.style.display = "none";
            hamster.classList.remove("active");
            section.classList.add("active");
            titulom.innerHTML = "Email ou senha inválidos.";
            descm.innerHTML = "";
            iconm.classList.add("fa-circle-xmark");
            iconm.classList.remove("fa-circle-check");
            modalbtn.style.display = "none";
            setTimeout(function () {
              section.classList.remove("active");
            }, 1500);
          }
        })
        .catch((error) => {
          console.error(error);
          loader.style.display = "none";
          hamster.classList.remove("active");
          section.classList.add("active");
          titulom.innerHTML = "Erro ao fazer login.";
          descm.innerHTML = "";
          iconm.classList.add("fa-circle-xmark");
          xmark;
          iconm.classList.remove("fa-circle-check");
          modalbtn.style.display = "none";
          setTimeout(function () {
            section.classList.remove("active");
          }, 1500);
        });
    });
  }
});
