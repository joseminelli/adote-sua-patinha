const { Pool } = require('pg');
const user = process.env.POSTGRES_USER || "postgres";
const host = process.env.POSTGRES_HOST || "localhost";
const database = process.env.POSTGRES_DATABASE || "AdoteSuaPatinha";
const password = process.env.POSTGRES_PASSWORD || "Zequinha2005";
const port = process.env.POSTGRES_PORT || 5432;
const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port, // Porta padrão do PostgreSQL
  });

class UserData {
  constructor() {
    // Não precisa do caminho do arquivo JSON, pois estamos usando o PostgreSQL
  }

  async updateUser(userP) {
    try {
      const query = {
        text: 'UPDATE usuarios SET name = $1, age = $2, telefone = $3, senha = $4 WHERE id = $5',
        values: [userP.name, userP.age, userP.telefone, userP.senha, userP.id],
      };
      await pool.query(query);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  async loginUser(email, senha) {
    try {
      const query = {
        text: 'SELECT id FROM usuarios WHERE email = $1 AND senha = $2',
        values: [email, senha],
      };
      const result = await pool.query(query);
      const usuario = result.rows[0];

      return usuario ? usuario.id : null;
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const query = {
        text: 'SELECT * FROM usuarios WHERE id = $1',
        values: [userId],
      };
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      throw error;
    }
  }

  async createUser(newUser) {
    try {
      const query = {
        text: 'INSERT INTO usuarios (id, name, age, regiao, telefone, email, senha, image, ong) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        values: [newUser.id, newUser.name, newUser.age, newUser.regiao, newUser.telefone, newUser.email, newUser.senha, newUser.image, newUser.ong],
      };
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }
  
}

module.exports = UserData;