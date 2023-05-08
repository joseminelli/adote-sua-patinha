const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
var sun = document.getElementById("sun");
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