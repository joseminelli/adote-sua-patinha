import data from './file.json'  assert { type: 'json' };

let loginId = 1;
var pessoalogada = data.pessoas.find(FindByID);
const nome = document.getElementById('name');
nome.innerHTML = pessoalogada.name;

data.pessoas.push()

const idade = document.getElementById('idade');
idade.innerHTML = pessoalogada.age + " anos";


const bairro = document.getElementById('bairro');
bairro.innerHTML = pessoalogada.neighborhood;


const qtdp = document.getElementById('qtdp');
qtdp.innerHTML = pessoalogada.qtd;


const pic = document.getElementById('pic');
pic.innerHTML = pessoalogada.pic;

function FindByID(pessoa) {
    return pessoa.id === loginId;
}