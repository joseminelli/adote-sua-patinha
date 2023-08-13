const fs = require("fs");

class UserData {
  constructor(filePath) {
    this.filePath = filePath || "../../usuarios.json";
  }

  readData() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Erro ao ler arquivo JSON:", error);
      throw error;
    }
  }

  writeData(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Erro ao escrever arquivo JSON:", error);
      throw error;
    }
  }

  updateUser(userP) {
    try {
      const usersData = this.readData();
      
      const userF = usersData.usuarios.find((user) => user.id === userP.id);
      userF.name = userP.name;
      userF.age = userP.age;
      userF.telefone = userP.telefone;
      userF.senha = userP.senha;
      
      fs.writeFile(this.filePath, JSON.stringify(usersData), (err) => {
        if (err) throw err;
      });
    } catch (error) {
      console.error("Erro ao escrever arquivo JSON:", error);
      throw error;
    }
  }

  getUserById(userId) {
    const usersData = this.readData();
    return usersData.usuarios.find((user) => user.id === userId);
  }
}

module.exports = UserData;
