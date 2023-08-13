const fs = require("fs");

class PetData {
  constructor(filePath) {
    this.filePath = filePath || "../../pets.json";
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

  getPetById(petId) {
    const petsData = this.readData();
    return petsData.pets.find((pet) => pet.id === petId);
  }
}

module.exports = PetData;