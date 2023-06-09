const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const fs = require("fs");

app.use(express.json());
app.use(cors());
app.post("/salvar", (req, res) => {
  if(fs.existsSync("pets.json") === false) {
    fs.writeFileSync("pets.json", '{"pets": []}');
  }
  console.log(req.body);
  const nome = req.body.nome;
  const idade = req.body.idade;
  const raca = req.body.raca;
  const descricao = req.body.descricao;
  const especie = req.body.especie;
  const imagem = req.body.imagem; // Acessar o arquivo enviado através de req.file

  fs.readFile("pets.json", "utf8", (err, data) => {
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
    fs.writeFile("pets.json", JSON.stringify(jsonData), (err) => {
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

app.get("/", (req, res) => {
  fs.readFile("pets.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao ler o arquivo JSON");
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});
