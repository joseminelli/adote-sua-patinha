const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const inputFile2 = document.querySelector("#picture__input2");
const picture__image2 = document.getElementById("picture__image2");
const pictureImage2 = document.querySelector(".picture__image2");
if(pictureImage2){
  pictureImage2.innerHTML = "Opcional";
}
pictureImage.innerHTML = "Obrigatório";
var enviarButton2 = document.getElementById("enviar2");
let cropper;
let croppedCanvas;
var screenWidth = window.innerWidth;

var mobile;
if (screenWidth < 800) {
  mobile = true;
} else {
  mobile = false;
}

inputFile.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("picture__img");
      img.setAttribute("id", "picture__img");
      pictureImage.innerHTML = "";
      pictureImage.appendChild(img);
      if (document.location.pathname.endsWith("/cadastro1.html")) {
        cropper = new Cropper(img, {
          aspectRatio: 1,
          viewMode: 1,
          dragMode: "move",
          autoCropArea: 1,
        });
      }
      if(!mobile && document.location.pathname.endsWith("/cadastro2.html")){
        pictureImage.style.marginLeft = "-26.3%"
      }
    });

    reader.readAsDataURL(file);
  }
});

if(document.location.pathname.endsWith("/cadastro2.html")){
  inputFile2.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;
  
        const img = document.createElement("img");
        img.src = readerTarget.result;
        img.classList.add("picture__img2");
        img.setAttribute("id", "picture__img2");
  
        pictureImage2.innerHTML = "";
        pictureImage2.appendChild(img);
        if(!mobile){
          picture__image2.style.marginLeft = "-26.3%"
        }
      });
  
      reader.readAsDataURL(file);
    }
  });
}

if (document.location.pathname.endsWith("/cadastro1.html")) {
  document
    .getElementById("select-image-btn")
    .addEventListener("click", function () {
      inputFile.click();
    });

  document.querySelector("#crop-button").addEventListener("click", function () {
    if (cropper) {
      croppedCanvas = cropper.getCroppedCanvas();

      pictureImage.innerHTML = "";
      const croppedImage = document.createElement("img");
      croppedImage.src = croppedCanvas.toDataURL();
      croppedImage.classList.add("picture__img");
      croppedImage.setAttribute("id", "picture__img");
      pictureImage.appendChild(croppedImage);

      enviarButton2.disabled = false;
    }
  });
}
