const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const sgMail = require("@sendgrid/mail");
const upload = multer();
const app = express();
const port = process.env.PORT || 3000;

//const UserData = require("./userData");
const UserData = require("./dbUserData");
//const PostData = require("./postData");
const PostData = require("./dbPostData");
//const PetData = require("./petData");
const PetData = require("./dbPetData");

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

sgMail.setApiKey(
  "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"
);
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

function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000);
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

app.post("/verificarSemCookie", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const userId = req.cookies["userId"];
  const data = await userDataReader.getUserBySession(userId);
  try {
    const sessionExists = await userDataReader.checkSessionExists(userId);
    if (!sessionExists) {
      res.json({ redirect: "/index.html" });
      return;
    } else {
      res.json({ id: data.user_id });
      return;
    }
  } catch (error) {
    res.json({ redirect: "/index.html" });
    console.error("Erro ao verificar sessão:", error);
    //res.status(500).json({ message: 'Erro ao verificar sessão.' });
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

app.post("/salvar", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const logId = verificarAutenticacao(req, res);
  if (!logId) {
    return;
  }
  const userId = req.cookies["userId"];

  const data = await userDataReader.getUserBySession(userId);
  const usuario = await userDataReader.getUserById(data.user_id);
  const user = await userDataReader.getUserById(logId);

  const nome = req.body.nome;
  const idade = req.body.idade;
  const raca = req.body.raca;
  const descricao = req.body.descricao;
  const especie = req.body.especie;
  const imagem = req.body.imagem;
  const imagem2 = req.body.imagem2;

  let date2 = new Date();
  date2 = date2.toISOString().slice(0, 10);
  date2 = date2.split("-").reverse().join("/");

  const newPet = {
    name: nome,
    age: idade,
    description: descricao,
    raca: raca,
    regiao: usuario.regiao,
    esp: especie,
    image: imagem,
    image2: imagem2,
    userId: usuario.id,
    data: date2,
  };

  try {
    await petDataReader.createPet(newPet);
    res.send("Dados salvos com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao salvar os dados");
  }
});

app.post("/salvarPessoa", upload.single("file"), async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const nome = req.body.nome;
  const idade = req.body.idade;
  const regiao = req.body.bairro;
  const telefone = req.body.telefone;
  const email = req.body.email.trim().toLowerCase();
  const senha = req.body.senha;
  const imagem = req.body.imagem;
  const checkEmailExists = await userDataReader.checkEmailExists(email);
  if (!checkEmailExists) {
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
    const idSessao = await userDataReader.sessionId(newId);
    res.cookie("userId", idSessao.session_id, {
      maxAge: 604800000, // 1 semana
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    try {
      await userDataReader.createUser(newUsuario);
      res.send("Dados salvos com sucesso");
    } catch (error) {
      res.status(500).send("Erro ao salvar os dados");
    }
  } else {
    res.status(500).send("Email já cadastrado");
  }
});

app.post("/deleteUser/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const senha = req.body.senha;
  const userId = req.cookies["userId"];
  const data = await userDataReader.getUserBySession(userId);
  const user = await userDataReader.getUserById(data.user_id);
  if(senha === user.senha){
    try {
      await userDataReader.deleteUser(user.id);
      await userDataReader.deleteSessionByUserId(
        data.session_id
      );
      res.send("true");
    } catch (error) {
      res.status(500).send("Erro ao excluir o usuário");
    }
  }else{
    res.status(500).send("Senha incorreta");
  }
});
  

app.post("/editarPessoa", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const nome = req.body.nome;
  const idade = req.body.idade;
  const telefone = req.body.telefone;
  const senha = req.body.senha;
  const userId = req.cookies["userId"];

  const data = await userDataReader.getUserBySession(userId);
  const usuario = await userDataReader.getUserById(data.user_id);

  if (usuario) {
    usuario.name = nome;
    usuario.age = idade;
    usuario.telefone = telefone;
    usuario.senha = senha;

    try {
      await userDataReader.updateUser(usuario);
      res.send("Dados salvos com sucesso");
    } catch (error) {
      res.status(500).send("Erro ao salvar os dados");
    }
  } else {
    res.status(404).send("Usuário não encontrado");
  }
});

app.get("/checkEmail/:email", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const email = req.params.email.trim().toLowerCase();
  const check = await userDataReader.checkEmailExists(email);
  if (check) {
    res.status(200).send("true");
    console.log("true");
  } else {
    res.status(500).send("false");
    console.log("false");
  }
});
app.get("/updatePassword/:email/:senha", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const email = req.params.email;
  const senha = req.params.senha;
  const user = await userDataReader.getUserByEmail(email);
  const check = await userDataReader.updatePassword(user, senha);
  console.log(check);
  if (check) {
    res.status(200).send("true");
    console.log("true");
    await userDataReader.deleteCode(email);
  } else {
    res.status(500).send("false");
    console.log("false");
  }
});
app.post("/checkCode/:code/:email", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const code = req.params.code;
  const check = await userDataReader.checkCodeExists(code);
  if (check) {
    res.status(200).send("true");
    console.log("true");
  } else {
    res.status(500).send("false");
    console.log("false");
  }
});
app.post("/enviarCodigo/:email", async (req, res) => {
  var email = req.params.email;
  const verificationCode = generateVerificationCode();
  userDataReader.createCode(verificationCode, email);

  const msg = {
    to: email,
    from: "adotesuapatinha@gmail.com",
    subject: `Código de Verificação [ ${verificationCode} ]`,
    html: `
    <p>Olá,</p>
    <p>Seu código de verificação é: <strong>${verificationCode}</strong></p>
    <p>Insira este código para concluir o processo de verificação.</p>
    <p>Atenciosamente,</p>
    <p>Equipe Adote Sua Patinha</p>
  `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send("true");
  } catch (error) {
    console.error(error);
    res.status(500).send("false");
  }
});

app.get("/logout", async (req, res) => {
  const userId = req.cookies["userId"];
  const data = await userDataReader.getUserBySession(userId);
  const sessao = await userDataReader.getSessionByUserId(data.user_id);
  
  if (usuario) {
    res.cookie("userId", sessao.session_id, {
      expires: new Date(Date.now() - 604800000), // -1 semana
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const deletedSessions = await userDataReader.deleteSessionByUserId(
      data.session_id
    );
    res.send({ redirect: "/index.html" });
  } else {
    res.status(401).send("Usuário não encontrado");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const senha = req.body.senha;

  try {
    var userId = await userDataReader.loginUser(email, senha);
    var idSessao = await userDataReader.sessionId(userId);
    console.log(idSessao);
    if (userId) {
      res.cookie("userId", idSessao.session_id, {
        maxAge: 604800000, // 1 semana
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.json({ redirect: "/main.html" });
    } else {
      res.status(401).send("Email ou senha inválidos");
    }
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).send("Erro ao realizar login");
  }
});

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});

app.get("/mural", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (fs.existsSync("../../pets.json") === false) {
    fs.writeFile("../../pets.json", '{"pets": []}', () => {});
  }
  if (fs.existsSync("../../usuarios.json") === false) {
    fs.writeFile("../../usuarios.json", '{"usuarios": []}', () => {});
  }
  const data = await petDataReader.getAllPets();
  const result = { pets: data };
  res.json(result);
});

app.get("/findUsuario/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const userId = req.params.id;
  const logId = verificarAutenticacao(req, res);
  if (!logId) {
    return;
  }

  const usuario = await userDataReader.getUserById(userId);
  console.log(usuario);
  res.json(usuario);
});

app.get("/findUsuarioByPet/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const petId = parseInt(req.params.id);
  const logId = verificarAutenticacao(req, res);
  if (!logId) {
    return;
  }

  const pet = await petDataReader.getPetById(petId);

  if (!pet) {
    res.status(404).send("Pet não encontrado");
    return;
  }

  const usuario = await userDataReader.getUserById(pet.userid);
  res.json(usuario);
});

app.get("/usuario", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const logId = verificarAutenticacao(req, res);
  if (!logId) {
    return;
  }

  const userId = req.cookies["userId"];

  const data = await userDataReader.getUserBySession(userId);
  const user = await userDataReader.getUserById(data.user_id);
  res.json(user);
});

app.get("/userPets", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const userId = req.cookies["userId"];

  const user = await userDataReader.getUserBySession(userId);
  const data = await petDataReader.getUserPets(user.user_id);

  res.json(data);
});

app.delete("/excluirPet/:petId", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const userId = req.cookies["userId"];
  const data = await userDataReader.getUserBySession(userId);
  const petId = parseInt(req.params.petId);

  try {
    await petDataReader.deletePet(petId, data.user_id);
    res.json({ message: "Pet excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir pet:", error);
    res.status(500).send("Erro ao excluir pet");
  }
});

app.post("/salvarPost", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  const categoria = req.body.categoria;
  const userId = req.cookies["userId"];

  const data = await userDataReader.getUserBySession(userId);

  try {
    const postData = new PostData();

    const newPost = {
      titulo: titulo,
      descricao: descricao,
      categoria: categoria,
      userId: data.user_id,
    };

    const createdPost = await postData.createPost(newPost);

    res.send("Dados salvos com sucesso");
  } catch (error) {
    console.error("Erro ao salvar post:", error);
    res.status(500).send("Erro ao salvar os dados");
  }
});

app.get("/posts", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  try {
    const searchTerm = req.query.search || "";

    const posts = await postDataReader.getAllPosts(searchTerm);

    for (const post of posts) {
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
    }

    res.json(posts);
  } catch (error) {
    console.error("Erro ao obter posts:", error);
    res.status(500).send("Erro ao obter posts");
  }
});

app.delete("/posts/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const postId = parseInt(req.params.id);

  try {
    const post = await postDataReader.getPostById(postId);

    if (post) {
      const userId = req.cookies["userId"];
      const data = await userDataReader.getUserBySession(userId);
      if (post.userid === data.user_id) {
        await postDataReader.deletePost(postId);

        res.sendStatus(200);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Erro ao excluir post:", error);
    res.sendStatus(500);
  }
});

app.get("/posts/:postId/respostas", async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);

    const postReplies = await postDataReader.getPostReplies(postId);

    console.log(postReplies);
    res.json(postReplies);
  } catch (error) {
    console.error("Erro ao obter respostas do post:", error);
    res.status(500).send("Erro ao obter respostas do post");
  }
});

app.post("/posts/:id/respostas", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const postId = parseInt(req.params.id);
  const resposta = req.body;

  try {
    const postData = new PostData();
    const post = await postData.getPostById(postId);

    if (post) {
      const userId = req.cookies["userId"];
      const data = await userDataReader.getUserBySession(userId);
      resposta.userId = data.user_id;

      const createdReply = await postData.createPostReply(postId, resposta);

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Erro ao adicionar resposta:", error);
    res.sendStatus(500);
  }
});

app.get("/email/:petId", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const petId = parseInt(req.params.petId);

  try {
    const petData = new PetData();
    const userEmail = await petData.getUserEmailByPetId(petId);

    if (!userEmail) {
      res.status(404).send("Usuário não encontrado");
      return;
    }

    res.send(userEmail);
  } catch (error) {
    console.error("Erro ao buscar e-mail do usuário:", error);
    res.sendStatus(500);
  }
});

module.exports = app;
