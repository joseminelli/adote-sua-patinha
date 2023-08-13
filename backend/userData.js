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

  getUserById(userId) {
    const usersData = this.readData();
    return usersData.usuarios.find((user) => user.id === userId);
  }
}

module.exports = UserData;
