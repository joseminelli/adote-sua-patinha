import data from './file.json'  assert { type: 'json' };

let loginId = 2;
var pessoalogada = data.pessoas.find(FindByID);
const nome = document.getElementById('name');
nome.innerHTML = pessoalogada.name;


const idade = document.getElementById('idade');
idade.innerHTML = pessoalogada.age + " anos";


const bairro = document.getElementById('bairro');
bairro.innerHTML = pessoalogada.neighborhood;


const qtdp = document.getElementById('qtdp');
qtdp.innerHTML = pessoalogada.qtd;

function FindByID(pessoa) {
    return pessoa.id === loginId;
}