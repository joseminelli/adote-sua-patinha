const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
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
    origin: ['https://adotesuapatinha.com', 'http://127.0.0.1:5500/']
  })
);

app.post("/verificarCookie", (req, res) => {
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
  const userId = req.cookies["userId"];

  fs.readFile("../../usuarios.json", "utf8", (err, userData) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao ler o arquivo JSON de usuários");
      return;
    }

    fs.readFile("../../pets.json", "utf8", (err, petData) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erro ao ler o arquivo JSON de pets");
        return;
      }
      const usersData = JSON.parse(userData);
      const user = usersData.usuarios.find((user) => user.id === userId);

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
        raca2: raca,
        regiao: user.regiao, 
        esp: especie,
        image: imagem,
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


app.post("/salvarPessoa", (req, res) => {
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

  fs.readFile("../../usuarios.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao ler o arquivo JSON");
      return;
    }

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
    res.cookie("userId", newId, { maxAge: 9000000, httpOnly: true, secure: true, sameSite: 'none' });


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
      res.cookie("userId", usuario.id, { maxAge: 9000000, httpOnly: true, secure: true, sameSite: 'none' });

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
    const usuario = jsonData.usuarios.find((user) => user.id === parseInt(userId));
    res.json(usuario);
  });
});

app.get("/perfil", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const userId = req.cookies["userId"];

  fs.readFile("../../pets.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao ler o arquivo JSON de pets");
      return;
    }

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

  fs.readFile("../../pets.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao ler o arquivo JSON de pets");
      return;
    }

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

  fs.readFile("../../pets.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao ler o arquivo JSON de pets");
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const pets = jsonData.pets;

      const petIndex = pets.findIndex((pet) => pet.id === petId && pet.userId === userId);
      if (petIndex === -1) {
        res.status(404).json({ message: "Pet não encontrado ou não pertence ao usuário." });
        return;
      }

      pets.splice(petIndex, 1);

      fs.writeFile("../../pets.json", JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Erro ao salvar o arquivo JSON de pets após a exclusão");
          return;
        }

        res.json({ message: "Pet excluído com sucesso!" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao processar a exclusão do pet");
    }
  });
});

