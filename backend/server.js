const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer();
const app = express();
const port = process.env.PORT || 3000;

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

function lerArquivo(arquivo, callback) {
  fs.readFile("../../" + arquivo + ".json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      callback(err);
      return;
    }

    callback(null, data);
  });
}

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
  if (fs.existsSync("../../pets.json") === false) {
    fs.writeFile("../../pets.json", '{"pets": []}', () => {});
  }
  console.log(req.body);
  const nome = req.body.nome;
  const idade = req.body.idade;
  const raca = req.body.raca;
  const descricao = req.body.descricao;
  const especie = req.body.especie;
  const imagem = req.body.imagem;
  const imagem2 = req.body.imagem2;
  const userId = req.cookies["userId"];

  lerArquivo("usuarios", (userData) => {
    lerArquivo("pets", (petData) => {
      const usersData = JSON.parse(userData);
      const user = usersData.usuarios.find(
        (user) => user.id === parseInt(userId)
      );

      if (!user) {
        res.status(404).send("Usuário não encontrado");
        return;
      }

      let jsonData = JSON.parse(petData);
      const newId =
        jsonData.pets.length > 0
          ? jsonData.pets[jsonData.pets.length - 1].id + 1
          : 1;

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
});

app.post("/salvarPessoa", upload.single("file"), (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (fs.existsSync("../../usuarios.json") === false) {
    fs.writeFile("../../usuarios.json", '{"usuarios": []}', () => {});
  }
  console.log(req.body);
  const nome = req.body.nome;
  const idade = req.body.idade;
  const regiao = req.body.bairro;
  const telefone = req.body.telefone;
  const email = req.body.email;
  const senha = req.body.senha;
  const imagem = req.body.imagem;

  lerArquivo("usuarios", (data) => {
    let jsonData = JSON.parse(data);
    const newId =
      jsonData.usuarios.length > 0
        ? jsonData.usuarios[jsonData.usuarios.length - 1].id + 1
        : 1;

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
    res.cookie("userId", newId, {
      maxAge: 9000000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

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
  const email = req.body.email.trim().toLowerCase();
  const senha = req.body.senha;

  lerArquivo("usuarios", (data) => {
    const jsonData = JSON.parse(data);
    const usuarios = jsonData.usuarios;

    const usuario = usuarios.find(
      (user) =>
        user.email.trim().toLowerCase() === email && user.senha === senha
    );
    if (usuario) {
      res.cookie("userId", usuario.id, {
        maxAge: 9000000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.json({ redirect: "/main.html" });
    } else {
      res.status(401).send("Email ou senha inválidos");
    }
  });
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

  lerArquivo("pets", (data) => {
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

app.get("/usuario", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const logId = verificarAutenticacao(req, res);
  if (!logId) {
    return;
  }

  const userId = req.cookies["userId"];

  fs.readFile("../../usuarios.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao ler o arquivo de usuários");
      return;
    }

    const jsonData = JSON.parse(data);
    const usuario = jsonData.usuarios.find(
      (user) => user.id === parseInt(userId)
    );
    res.json(usuario);
  });
});

app.get("/perfil", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const userId = req.cookies["userId"];

  lerArquivo("pets", (data) => {
    const jsonData = JSON.parse(data);
    const pets = jsonData.pets;

    const userPets = pets.filter((pet) => pet.userId === userId);
    console.log(userPets);
    const petElements = userPets.map((pet) => {
      return `
        <div id="pet" class="pet"> 
          <div id="delBtnDiv${pet.id}" class="delBtnDiv">
            <div id="btnDel" class="btnDel" onclick="excluirPet(${pet.id})">
              <div class="x1"></div>
              <div class="x2"></div>
            </div>
          </div>
          <a href="perfilpf.html?pet=${pet.id}">
            <img id="fotopet" src="${pet.image}">
          </a>
        </div>
      `;
    });
    console.log(petElements);

    res.send(petElements.join(""));
  });
});

app.get("/maxPets", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const userId = req.cookies["userId"];

  lerArquivo("pets", (data) => {
    const jsonData = JSON.parse(data);
    const pets = jsonData.pets;

    const userPets = pets.filter((pet) => pet.userId === userId);

    res.json(userPets);
  });
});

app.delete("/excluirPet/:petId", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const userId = req.cookies["userId"];
  const petId = parseInt(req.params.petId);

  lerArquivo("pets", (data) => {
    try {
      const jsonData = JSON.parse(data);
      const pets = jsonData.pets;

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

      fs.writeFile("../../pets.json", JSON.stringify(jsonData, null, 2),
        (err) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .send("Erro ao salvar o arquivo JSON de pets após a exclusão");
            return;
          }

          res.json({ message: "Pet excluído com sucesso!" });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao processar a exclusão do pet");
    }
  });
});

app.post("/salvarPost", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  let posts = [];
  if (fs.existsSync("../../posts.json")) {
    const data = fs.readFileSync("../../posts.json", "utf8");
    posts = JSON.parse(data);
  }

  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  const categoria = req.body.categoria;
  const userId = req.cookies["userId"];
  const postId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;

  const usuariosData = fs.readFileSync("../../usuarios.json", "utf8");
  const usuarios = JSON.parse(usuariosData);
  const user = usuarios.usuarios.find(
    (usuario) => usuario.id === parseInt(userId)
  );
  const nomeUsuario = user ? user.name : "[Usuário não identificado]";

  const newPost = {
    id: postId,
    titulo: "Post de " + nomeUsuario + ": " + titulo,
    descricao: descricao,
    categoria: categoria,
    userId: userId,
  };

  posts.push(newPost);

  fs.writeFileSync("../../posts.json", JSON.stringify(posts));

  res.sendStatus(200);
});

app.get("/posts", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  let posts = [];
  if (fs.existsSync("../../posts.json")) {
    const data = fs.readFileSync("../../posts.json", "utf8");
    posts = JSON.parse(data);
  }

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
  if (fs.existsSync("../../posts.json")) {
    const data = fs.readFileSync("../../posts.json", "utf8");
    posts = JSON.parse(data);
  }
  console.log(posts);
  const postIndex = posts.findIndex((post) => post.id === postId);

  if (postIndex !== -1) {
    const userId = req.cookies["userId"];
    if (posts[postIndex].userId === userId) {
      posts.splice(postIndex, 1);

      fs.writeFileSync("../../posts.json", JSON.stringify(posts));

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
  if (fs.existsSync("../../posts.json")) {
    const data = fs.readFileSync("../../posts.json", "utf8");
    posts = JSON.parse(data);
  }

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

    const usuariosData = fs.readFileSync("../../usuarios.json", "utf8");
    const usuarios = JSON.parse(usuariosData);
    const user = usuarios.usuarios.find(
      (usuario) => usuario.id === parseInt(userId)
    );
    const nomeUsuario = user ? user.name : "[Usuário não identificado]";

    resposta.autor = nomeUsuario;

    posts[postIndex].respostas.push(resposta);

    fs.writeFileSync("../../posts.json", JSON.stringify(posts));

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.get("/email/:petId", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const petId = parseInt(req.params.petId);

  lerArquivo("usuarios", (userData) => {

    lerArquivo("pets", (petData) => {
      const usersData = JSON.parse(userData);
      const petsData = JSON.parse(petData);

      const pet = petsData.pets.find((pet) => pet.id === parseInt(petId));
      const userId = pet.userId;
      const user = usersData.usuarios.find(
        (user) => user.id === parseInt(userId)
      );
      console.log(pet.userId);

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
  });
});
