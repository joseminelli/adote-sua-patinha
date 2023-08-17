const senha = document.querySelector("#senha");
const strengthTxt = document.querySelector("#strength");

function Strength(senha){
    let i = 0;
    var ehmaior = 0;
    var temMaiuscula = 0;
    var temNumero = 0;
    var temSimbolo = 0;
    if(senha.length > 5 && ehmaior != 1){
        i++;
        ehmaior = 1;
    }else{
        ehmaior = 0;
    }
    if((senha.match(/[a-z]/)) && (senha.match(/[A-Z]/))&& temMaiuscula != 1){
        i++;
        temMaiuscula = 1;
    } else {
        temMaiuscula = 0;
    }
    if(senha.match(/\d+/)&& temNumero != 1){
        i++;
        temNumero = 1;
    } else {
        temNumero = 0;
    }
    if(senha.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)&& temSimbolo != 1){
        i++;
        temSimbolo = 1;
    } else {
        temSimbolo = 0;
    }
    return i;
}
document.addEventListener("DOMContentLoaded", function () {
    strengthTxt.innerHTML = "Senha fraca";
    strengthTxt.style.color = "red";
    senha.addEventListener("keyup", (e) => {
      let strength = Strength(senha.value)
      console.log(strength);
      if(strength < 2){
        senha.style.borderColor = "red";
        strengthTxt.innerHTML = "Senha fraca";
        strengthTxt.style.color = "red";
      } else if(strength >= 2 && strength < 3){
        senha.style.borderColor = "#a5890d";
        strengthTxt.innerHTML = "Senha média";
        strengthTxt.style.color = "#a5890d";
      } else {
        senha.style.borderColor = "#1e7a07";
        strengthTxt.innerHTML = "Senha forte";
        strengthTxt.style.color = "#1e7a07";
      }
    });
});
