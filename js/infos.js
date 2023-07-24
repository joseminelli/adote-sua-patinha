document.addEventListener("DOMContentLoaded", async function () {
  const malitoLink = document.getElementById("malitoLink");
  var darkModeEnabled = localStorage.getItem("darkModeEnabled");
  const loader = document.getElementById("loader");
  const hamster = document.getElementById("hamster");
  const contato = document.getElementById("contato");
  loader.style.display = "flex";
  hamster.classList.add("active");
  var response = await fetch(`https://api.adotesuapatinha.com/mural`);
  var data = await response.json();
  if (data) {
    setTimeout(function () {
      hamster.classList.remove("active");
      setTimeout(function () {
        loader.style.display = "none";
      }, 300);
    }, 300);
  } else {
    loader.style.display = "flex";
    hamster.classList.add("active");
  }
  const url = new URL(window.location.href);
  const numpet = url.searchParams.get("pet");
  const box = document.getElementById("box");

  const petInfo = data.pets.find(findByID);
  
  const responseEmail = await fetch(`https://api.adotesuapatinha.com/email/` + numpet, {
    credentials: "include",
  });

  if (responseEmail.ok) {
    const dataEmail = await responseEmail.text();
    const email  = dataEmail;

    malitoLink.href = `mailto:${email}`;
  }
  function findByID(pet) {
    return pet.id == numpet;
  }

  if (petInfo) {
    box.style.justifyContent = "left";
    const picElement = document.getElementById("imagem");
    const picElement2 = document.getElementById("imagem2");
    const celElement = document.getElementById("desc");
    const bairroElement = document.getElementById("raca");
    const idadeElement = document.getElementById("idade");
    const nomeElement = document.getElementById("name");

    nomeElement.innerHTML = petInfo.name;
    idadeElement.innerHTML = petInfo.age;
    bairroElement.innerHTML = petInfo.raca2;
    celElement.innerHTML = petInfo.description;
    picElement.src = petInfo.image;
    if (petInfo.image2){
      picElement2.src = petInfo.image2;
    } else {
      picElement2.style.display = "none";
    }
    
  } else {
    box.style.justifyContent = "center";
    box.innerHTML =
      "<div id='erro404'><div><h2 id='h2Erro'>Algo deu errado</h2><p id='pErro'>O pet escolhido não foi encontrado</p></div><img id='imagemErro' src='./img/4042.png'></div>";
    if (darkModeEnabled === "true") {
      h2Erro.style.color = "#fff";
      pErro.style.color = "#fff";
    }
  }
});
