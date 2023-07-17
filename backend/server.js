const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 3000;

const fs = require("fs");

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.post("/salvar", (req, res) => {
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
    const newId = jsonData.pets.length > 0 ? jsonData.pets[jsonData.pets.length - 1].id + 1 : 1;

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
      '{"usuarios": []}',
      () => {}
    );
  }
  console.log(req.body);
  const nome = req.body.nome;
  const idade = req.body.idade;
  const regiao = req.body.bairro;
  const telefone = req.body.telefone;
  const email = req.body.email;
  const senha = req.body.senha;
  const imagem = req.body.imagem; 

  fs.readFile("../../usuarios.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao ler o arquivo JSON");
      return;
    }

    let jsonData = JSON.parse(data);
    const newId = jsonData.usuarios.length > 0 ? jsonData.usuarios[jsonData.usuarios.length - 1].id + 1 : 1;

    const newUsuario = {
      id: newId,
      name: nome,
      age: idade,
      regiao: regiao,
      telefone: telefone,
      email: email,
      senha: senha,
      image: imagem,
    };

    jsonData.usuarios.push(newUsuario);
    console.log(JSON.stringify(newUsuario));
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

app.post("/login", (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  fs.readFile("../../usuarios.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao ler o arquivo de usuários");
      return;
    }
  
    const jsonData = JSON.parse(data);
    const usuarios = jsonData.usuarios;
  
    const usuario = usuarios.find(
      (user) => user.email === email && user.senha === senha
    );
    if (usuario) {
      res.json({ userId: usuario.id });
      res.json({ redirect: "/main.html" });
    } else {
      res.status(401).send("Email ou senha inválidos");
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});

app.get("/", (req, res) => {
  if (fs.existsSync("../../pets.json") === false) {
    fs.writeFile(
      "../../pets.json",
      '{"pets": []}',
      () => {}
    );
  }
  if (fs.existsSync("../../usuarios.json") === false) {
    fs.writeFile(
      "../../usuarios.json",
      '{"usuarios": []}',
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

app.get("/usuarios", (req, res) => {
  fs.readFile("../../usuarios.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao ler o arquivo de usuários");
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});
