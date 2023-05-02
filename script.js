const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "Escolha uma imagem";
var sun = document.getElementById("sun");
pictureImage.innerHTML = pictureImageTxt;
const body = document.querySelector('body');
const p = document.querySelector('div.mural > p');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

sun.onclick = function(){
  sun.classList.toggle("night");
  if(this.classList.toggle('darkToggle')){
    body.style.background = '#1a1a1a'
    p.style.color = '#ffffff'
    body.style.transition = '1s'
  }else{
    body.style.background = '#ffffff'
    p.style.color = '#1a1a1a'
  }
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

      pictureImage.innerHTML = "";
      pictureImage.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage.innerHTML = pictureImageTxt;
  }
});