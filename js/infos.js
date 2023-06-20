document.addEventListener("DOMContentLoaded", async function () {
  var response = await fetch("js/pets.json");
  var data = await response.json();
  const url = new URL(window.location.href);
  const numpet = url.searchParams.get("pet");
  const box = document.getElementById("box");

  const petInfo = data.pets.find(findByID);

  function findByID(pet) {
    return pet.id == numpet;
  }

  if (petInfo) {
    box.style.justifyContent = "left";
    // Atualize os elementos HTML com as informações obtidas
    const picElement = document.getElementById("imagem");
    const celElement = document.getElementById("desc");
    const bairroElement = document.getElementById("raca");
    const idadeElement = document.getElementById("idade");
    const nomeElement = document.getElementById("name");

    nomeElement.innerHTML = petInfo.name;
    idadeElement.innerHTML = petInfo.age;
    bairroElement.innerHTML = petInfo.raca2;
    celElement.innerHTML = petInfo.description;
    picElement.src = petInfo.image;
  } else {
    box.style.justifyContent = "center";
    box.innerHTML = "<div id='erro404'><div><h2 id='h2Erro'>Algo deu errado</h2><p id='pErro'>O pet escolhido não foi encontrado</p></div><img id='imagemErro' src='./img/404.png'></div>";
  }
});
