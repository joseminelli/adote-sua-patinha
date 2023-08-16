const { Pool } = require('pg');
const user = process.env.POSTGRES_USER || "postgres";
const host = process.env.POSTGRES_HOST || "localhost";
const database = process.env.POSTGRES_DATABASE || "AdoteSuaPatinha";
const password = process.env.POSTGRES_PASSWORD || "Zequinha2005";
const port = process.env.POSTGRES_PORT || 5432;
const pool = new Pool({
    ssl: true,
    user: user,
    host: host,
    database: database,
    password: password,
    port: port, // Porta padrão do PostgreSQL
  });

class PetData {
  constructor() {
    // Não precisa do caminho do arquivo JSON, pois estamos usando o PostgreSQL
  }

  async deletePet(petId, userId) {
    try {
      const query = {
        text: 'DELETE FROM pets WHERE id = $1 AND userid = $2',
        values: [petId, userId],
      };
      await pool.query(query);
    } catch (error) {
      console.error('Erro ao excluir pet:', error);
      throw error;
    }
  }

  async getNextPetId() {
    try {
      const query = {
        text: 'SELECT MAX(id) + 1 AS next_id FROM pets',
      };
      const result = await pool.query(query);
      return result.rows[0].next_id || 1;
    } catch (error) {
      console.error('Erro ao obter próximo ID de pet:', error);
      throw error;
    }
  }

  async createPet(newPet) {
    try {
      const nextId = await this.getNextPetId();

      const query = {
        text: 'INSERT INTO pets (id, name, age, description, raca, regiao, esp, image, image2, userid, data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
        values: [nextId, newPet.name, newPet.age, newPet.description, newPet.raca, newPet.regiao, newPet.esp, newPet.image, newPet.image2, newPet.userId, newPet.data],
      };
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar pet:', error);
      throw error;
    }
  }

  async getUserPets(userId) {
    try {
      const query = {
        text: "SELECT * FROM pets WHERE userId = $1",
        values: [userId],
      };
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Erro ao buscar pets do usuário:", error);
      throw error;
    }
  }
  
  async getUserEmailByPetId(petId) {
    try {
      const query = {
        text: 'SELECT usuarios.email FROM usuarios JOIN pets ON usuarios.id = pets.userId WHERE pets.id = $1',
        values: [petId],
      };
      const result = await pool.query(query);
      return result.rows[0]?.email;
    } catch (error) {
      console.error('Erro ao buscar e-mail do usuário:', error);
      throw error;
    }
  }
  
  async getAllPets() {
    try {
      const query = "SELECT * FROM pets";
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Erro ao buscar todos os pets:", error);
      throw error;
    }
  }
  async getPetById(petId) {
    try {
      const query = {
        text: "SELECT * FROM pets WHERE id = $1",
        values: [petId],
      };
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao buscar pet por ID:", error);
      throw error;
    }
  }
}

module.exports = PetData;
