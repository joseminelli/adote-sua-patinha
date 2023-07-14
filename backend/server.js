const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const fs = require("fs");

app.use(express.json());
app.use(cors());
app.post("/salvarPet", (req, res) => {
  if (fs.existsSync("../../pets.json") === false) {
    fs.writeFile(
      "../../pets.json",
      '{"pets": []}',
      () => {}
    );
  }
  console.log(req.body);
  const nome = req.body.nome;
  const idade = req.body.idade;
  const raca = req.body.raca;
  const descricao = req.body.descricao;
  const especie = req.body.especie;
  const imagem = req.body.imagem; 

  fs.readFile("../../pets.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao ler o arquivo JSON");
      return;
    }

    let jsonData = JSON.parse(data);
    const newId = jsonData.pets.length + 1;

    const newPet = {
      id: newId,
      name: nome,
      age: idade,
      description: descricao,
      raca: raca,
      raca2: raca,
      regiao: "pampulha",
      esp: especie,
      image: imagem,
    };

    jsonData.pets.push(newPet);
    console.log(JSON.stringify(newPet));
    fs.writeFile("../../pets.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erro ao salvar os dados");
      } else {
        res.send("Dados salvos com sucesso");
      }
    });
  });
});

app.post("/salvarPessoa", (req, res) => {
  if (fs.existsSync("../../usuarios.json") === false) {
    fs.writeFile(
      "../../usuarios.json",
      '{"pets": []}',
      () => {}
    );
  }
  console.log(req.body);
  const nome = req.body.nome;
  const idade = req.body.idade;
  const bairro = req.body.bairro;
  const telefone = req.body.telefone;
  const email = req.body.email;
  const senha = req.body.senha;
  const pets = req.body.senha;
  const imagem = req.body.imagem; 

  fs.readFile("../../usuarios.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao ler o arquivo JSON");
      return;
    }

    let jsonData = JSON.parse(data);
    const newId = jsonData.pets.length + 1;

    const newPessoa = {
      id: newId,
      name: nome,
      age: idade,
      bairro: bairro,
      telefone: telefone,
      email: email,
      senha: senha,
      pets: pets,
      image: imagem,
    };

    jsonData.pets.push(newPessoa);
    console.log(JSON.stringify(newPessoa));
    fs.writeFile("../../usuarios.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erro ao salvar os dados");
      } else {
        res.send("Dados salvos com sucesso");
      }
    });
  });
});


app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});

app.get("/getPets", (req, res) => {
  if (fs.existsSync("../../pets.json") === false) {
    fs.writeFile(
      "../../pets.json",
      '{"pets": []}',
      () => {}
    );
  }
  fs.readFile("../../pets.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao ler o arquivo JSON");
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});
