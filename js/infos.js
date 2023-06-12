document.addEventListener("DOMContentLoaded", function () {
  fetch("js/pets.json")
    .then((response) => response.json())
    .then((data) => {
      const url = new URL(window.location.href);
      const numpet = url.searchParams.get("pet");

      const petInfo = data.pets.find(findByID);
      console.log(petInfo);

      function findByID(pet) {
        return pet.id == numpet;
      }

      if (petInfo) {
        // Atualize os elementos HTML com as informações obtidas

        const nomeElement = document.getElementById("name");
        nomeElement.innerHTML = petInfo.name;

        const idadeElement = document.getElementById("idade");
        idadeElement.innerHTML = petInfo.age;

        const bairroElement = document.getElementById("raca");
        bairroElement.innerHTML = petInfo.raca;

        const celElement = document.getElementById("desc");
        celElement.innerHTML = petInfo.description;

        const picElement = document.getElementById("imagem");
        picElement.src = petInfo.image;
      } else {
        console.log("Pet não encontrado");
      }
    });
});
