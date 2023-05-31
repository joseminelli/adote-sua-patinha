var login = localStorage.getItem("login");


document.addEventListener("DOMContentLoaded", function () {
    //não acessa a página se não tiver login
    if (login != "true") {
        window.location.href = "index.html";
    }
});


fetch("js/pets.json")

  //call API and get JSON format
  .then((response) => response.json())
  //print API on app = app.append(...todoosItens)
  .then((responseJson) => {
    console.log(responseJson);
    var todosOsItens = [];
    responseJson.forEach((item) => {
      //console.log(item.price);
      //cria imagem
      const image = document.createElement("img");
      image.src = item.image;
      image.className = "card-img-top";

      /*cria nome
      const title = document.createElement("h5");
      title.textContent = item.title.substring(0, 36) + "...";
      title.className = "card-title";
      //cria descrição
      const description = document.createElement("p");
      description.textContent = item.description.substring(0, 70) + "...";

      //categoria
      const category = document.createElement("p");
      category.textContent = item.category;

      const divCard = document.createElement("div");
      divCard.append(title, description);
      divCard.className = "card-body";

      //cria preço
      const price = document.createElement("b");
      price.textContent = "R" + formatPrice(item.price);
      price.className = "nav me-auto ms-3 mt-3";

      //cria botão
      const addToCard = document.createElement("button");
      addToCard.textContent = "Add ao carrinho";
      addToCard.className = "btn btn-outline-success flex-row-reverse m-2";
      addToCard.id = "addToCard";
      addToCard.addEventListener("click", function () {
        addItemToCart(
          title.textContent.substring(0, 15) + "...",
          price.textContent
        );
      });

      const actionDiv = document.createElement("div");
      actionDiv.append(price, addToCard);
      actionDiv.className = "d-flex";*/

      //cria conainer
      const actionDiv = document.createElement("div");
      const divCard = document.createElement("div");
      const myContainer = document.createElement("div");
      myContainer.append(image, divCard, actionDiv);
      myContainer.className;
      ("card h-100");

      const bigContainer = document.createElement("div");
      bigContainer.append = myContainer;
      bigContainer.className = "col";
      bigContainer.style.backgroundColor = "white";

      todosOsItens.push(myContainer);
    });
    app.append(...todosOsItens);
  });