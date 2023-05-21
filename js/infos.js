import data from './file.json'  assert { type: 'json' };

let loginId = 2;
var pessoalogada = data.pessoas.find(FindByID);
const nome = document.getElementById('name');
nome.innerHTML = pessoalogada.name;

data.pessoas.push()

const idade = document.getElementById('idade');
idade.innerHTML = pessoalogada.age + " anos";


const bairro = document.getElementById('bairro');
bairro.innerHTML = pessoalogada.neighborhood;


const cel = document.getElementById('cel');
cel.innerHTML = pessoalogada.cel;


const pic = document.getElementById('pic');
pic.innerHTML = pessoalogada.pic;

function FindByID(pessoa) {
    return pessoa.id === loginId;
}