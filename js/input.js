const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
var enviarButton2 = document.getElementById("enviar2"); 
let cropper;
let croppedCanvas;

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

      cropper = new Cropper(img, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: "move",
        autoCropArea: 1,
      });
    });

    reader.readAsDataURL(file);
  }
});

document.getElementById("select-image-btn").addEventListener("click", function () {
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