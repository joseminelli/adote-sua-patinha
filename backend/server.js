const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const upload = multer();
const app = express();
const port = process.env.PORT || 3000;

const UserData = require("./userData");
const PostData = require("./postData");
const PetData = require("./petData");

const userDataReader = new UserData();
const postDataReader = new PostData();
const petDataReader = new PetData();

function verificarAutenticacao(req, res) {
  const userId = req.cookies["userId"];
  if (!userId) {
    res.status(401).send("Usuário não autenticado");
    return;
  } else {
    return userId;
  }
}
const fs = require("fs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      "https://adotesuapatinha.com",
      "http://127.0.0.1:5500/",
      "http://localhost:5500",
    ],
  })
);

app.post("/verificarCookie", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const userId = req.cookies["userId"];
  if (!userId) {
    res.json({ redirect: "/index.html" });
    return;
  } else if (userId) {
    res.json({ redirect: "/main.html" });
    return;
  }
});

app.post("/verificarSemCookie", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const userId = req.cookies["userId"];
  if (!userId) {
    res.json({ redirect: "/index.html" });
    return;
  } else if (userId) {
    res.json({ id: userId });
    return;
  }
});

app.post("/verificarCookieTF", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const userId = req.cookies["userId"];
  if (userId) {
    res.send("true");
  } else {
    res.send("false");
  }
});

app.post("/salvar", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const logId = verificarAutenticacao(req, res);
  if (!logId) {
    return;
  }

  const user = userDataReader.getUserById(logId);

  if (!user) {
    res.status(404).send("Usuário não encontrado");
    return;
  }

  const petsData = petDataReader.readData();
  const newId =
    petsData.pets.length > 0
      ? petsData.pets[petsData.pets.length - 1].id + 1
      : 1;

  const nome = req.body.nome;
  const idade = req.body.idade;
  const raca = req.body.raca;
  const descricao = req.body.descricao;
  const especie = req.body.especie;
  const imagem = req.body.imagem;
  const imagem2 = req.body.imagem2;
  const userId = logId;

  let date2 = new Date();
  date2 = date2.toISOString().slice(0, 10);
  date2 = date2.split("-").reverse().join("/");

  const newPet = {
    id: newId,
    name: nome,
    age: idade,
    description: descricao,
    raca: raca,
    regiao: user.regiao,
    esp: especie,
    image: imagem,
    image2: imagem2,
    userId: userId,
    data: date2,
  };

  petsData.pets.push(newPet);

  try {
    petDataReader.writeData(petsData);
    res.send("Dados salvos com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao salvar os dados");
  }
});

app.post("/salvarPessoa", upload.single("file"), (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const nome = req.body.nome;
  const idade = req.body.idade;
  const regiao = req.body.bairro;
  const telefone = req.body.telefone;
  const email = req.body.email;
  const senha = req.body.senha;
  const imagem = req.body.imagem;

  const userData = userDataReader.readData();
  const newId = uuidv4();

  const newUsuario = {
    id: newId,
    name: nome,
    age: idade,
    regiao: regiao,
    telefone: telefone,
    email: email,
    senha: senha,
    image: imagem,
    ong: "não",
  };

  userData.usuarios.push(newUsuario);
  res.cookie("userId", newId, {
    maxAge: 604800000, // 1 semana
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  try {
    userDataReader.writeData(userData);
    res.send("Dados salvos com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao salvar os dados");
  }
});

app.post("/editarPessoa", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const nome = req.body.nome;
  const idade = req.body.idade;
  const telefone = req.body.telefone;
  const senha = req.body.senha;
  const userId = req.cookies["userId"];

  const usuario = userDataReader.getUserById(userId);

  if (usuario) {
    usuario.name = nome;
    usuario.age = idade;
    usuario.telefone = telefone;
    usuario.senha = senha;

    try {
      userDataReader.updateUser(usuario);
      res.send("Dados salvos com sucesso");
    } catch (error) {
      res.status(500).send("Erro ao salvar os dados");
    }
  } else {
    res.status(404).send("Usuário não encontrado");
  }
});

app.get("/logout", (req, res) => {
  const userId = req.cookies["userId"];

  const usuario = userDataReader.getUserById(userId);
  if (usuario) {
    res.cookie("userId", usuario.id, {
      expires: new Date(Date.now() - 604800000), // -1 semana
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.send({ redirect: "/index.html" });
  } else {
    res.status(401).send("Usuário não encontrado");
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const senha = req.body.senha;

  const data = userDataReader.readData();

  const usuarios = data.usuarios;

  const usuario = usuarios.find(
    (user) => user.email.trim().toLowerCase() === email && user.senha === senha
  );
  if (usuario) {
    res.cookie("userId", usuario.id, {
      expires: new Date(Date.now() - 604800000), // 1 semana
      maxAge: 604800000, // 1 semana
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({ redirect: "/main.html" });
  } else {
    res.status(401).send("Email ou senha inválidos");
  }
});

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});

app.get("/mural", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (fs.existsSync("../../pets.json") === false) {
    fs.writeFile("../../pets.json", '{"pets": []}', () => {});
  }
  if (fs.existsSync("../../usuarios.json") === false) {
    fs.writeFile("../../usuarios.json", '{"usuarios": []}', () => {});
  }
  const data = petDataReader.readData();

  res.json(data);
});

app.get("/findUsuario/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const userId = req.params.id;
  const logId = verificarAutenticacao(req, res);
  if (!logId) {
    return;
  }

  const usuario = userDataReader.getUserById(userId);
  res.json(usuario);
});

app.get("/findUsuarioByPet/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const petId = parseInt(req.params.id);
  const logId = verificarAutenticacao(req, res);
  if (!logId) {
    return;
  }

  const pet = petDataReader.getPetById(petId);
  if (!pet) {
    res.status(404).send("Pet não encontrado");
    return;
  }

  const usuario = userDataReader.getUserById(pet.userId);
  res.json(usuario);
});

app.get("/usuario", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const logId = verificarAutenticacao(req, res);
  if (!logId) {
    return;
  }

  const userId = req.cookies["userId"];

  const data = userDataReader.readData();

  const usuario = data.usuarios.find((user) => user.id === userId);
  res.json(usuario);
});

app.get("/userPets", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const userId = req.cookies["userId"];

  const data = petDataReader.getUserPets(userId);

  res.json(data);
});

app.delete("/excluirPet/:petId", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const userId = req.cookies["userId"];
  const petId = parseInt(req.params.petId);

  const data = petDataReader.readData();

  try {
    const pets = data.pets;

    const petIndex = pets.findIndex(
      (pet) => pet.id === petId && pet.userId === userId
    );
    if (petIndex === -1) {
      res
        .status(404)
        .json({ message: "Pet não encontrado ou não pertence ao usuário." });
      return;
    }

    pets.splice(petIndex, 1);

    try {
      petDataReader.writeData(data);
      res.json({ message: "Pet excluído com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao excluir pet");
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao processar a exclusão do pet");
  }
});

app.post("/salvarPost", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  let posts = [];
  posts = postDataReader.readData();

  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  const categoria = req.body.categoria;
  const userId = req.cookies["userId"];
  const postId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;

  const user = userDataReader.getUserById(userId);
  const nomeUsuario = user ? user.name : "[Usuário não identificado]";

  const newPost = {
    id: postId,
    titulo: "Post de " + nomeUsuario + ": " + titulo,
    descricao: descricao,
    categoria: categoria,
    userId: userId,
  };

  posts.push(newPost);

  try {
    postDataReader.writeData(posts);
    res.send("Dados salvos com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao salvar os dados");
  }
});

app.get("/posts", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  let posts = [];
  posts = postDataReader.readData();

  const searchTerm = req.query.search;

  if (searchTerm) {
    posts = posts.filter(
      (post) =>
        post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  posts.forEach((post) => {
    if (post.respostas) {
      post.respostas = post.respostas.map((resposta) => {
        return {
          descricao: resposta.descricao,
          userId: resposta.userId,
          id: resposta.id,
          autor: resposta.autor,
        };
      });
    }
  });

  res.json(posts);
});

app.delete("/posts/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const postId = parseInt(req.params.id);

  let posts = [];
  posts = postDataReader.readData();

  const postIndex = posts.findIndex((post) => post.id === postId);

  if (postIndex !== -1) {
    const userId = req.cookies["userId"];
    if (posts[postIndex].userId === userId) {
      posts.splice(postIndex, 1);

      postDataReader.writeData(posts);

      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(404);
  }
});

app.post("/posts/:id/respostas", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const postId = parseInt(req.params.id);
  const resposta = req.body;

  let posts = [];
  posts = postDataReader.readData();

  const postIndex = posts.findIndex((post) => post.id === postId);

  if (postIndex !== -1) {
    const userId = req.cookies["userId"];
    resposta.userId = userId;

    if (!posts[postIndex].respostas) {
      posts[postIndex].respostas = [];
    }

    const respostaId =
      posts[postIndex].respostas.length > 0
        ? posts[postIndex].respostas[posts[postIndex].respostas.length - 1].id +
          1
        : 1;
    resposta.id = respostaId;

    posts[postIndex].respostas.push(resposta);

    postDataReader.writeData(posts);

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.get("/email/:petId", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const petId = parseInt(req.params.petId);

  const pet = petDataReader.getPetById(petId);
  const userId = pet.userId;
  const user = userDataReader.getUserById(userId);

  if (!user) {
    res.status(404).send("Usuário não encontrado");
    return;
  }

  if (!pet) {
    res.status(404).send("Pet não encontrado");
    return;
  }

  const userEmail = user.email;
  res.send(userEmail);
});

module.exports = app;
