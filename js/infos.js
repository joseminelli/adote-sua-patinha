fetch("js/file.json")
.then(response => response.json())
.then(data => console.log(data))

import data from './file.json'  assert { type: 'json' };;

const nome = document.getElementById('name');
nome.innerHTML = data.pessoas.name;


const idade = document.getElementById('idade');
idade.innerHTML = data.pessoas.age + " anos";


const bairro = document.getElementById('bairro');
bairro.innerHTML = data.pessoas.neighborhood;


const qtdp = document.getElementById('qtdp');
qtdp.innerHTML = data.pessoas.qtd;