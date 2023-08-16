const { format } = require("date-fns");

const { Pool } = require("pg");
const user = process.env.POSTGRES_USER || "postgres";
const host = process.env.POSTGRES_HOST || "localhost";
const database = process.env.POSTGRES_DATABASE || "AdoteSuaPatinha";
const password = process.env.POSTGRES_PASSWORD || "Zequinha2005";
const port = process.env.POSTGRES_PORT || 5432;

const { v4: uuidv4 } = require("uuid");
const pool = new Pool({
  ssl: true,
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
        text: "UPDATE usuarios SET name = $1, age = $2, telefone = $3, senha = $4 WHERE id = $5",
        values: [userP.name, userP.age, userP.telefone, userP.senha, userP.id],
      };
      await pool.query(query);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  }
  async deleteCode(email) {
    try {
      const query = {
        text: "DELETE FROM reset_password WHERE email = $1",
        values: [email],
      };
      const result = await pool.query(query);
      return result.rowCount; // Número de linhas excluídas
    } catch (error) {
      console.error("Erro ao excluir código por email:", error);
      throw error;
    }
  }
  async updatePassword(userP, senha) {
    try {
      const query = {
        text: "UPDATE usuarios SET senha = $1 WHERE id = $2",
        values: [senha, userP.id],
      };
      const result = await pool.query(query);
      
      if (result.rowCount > 0) {
        return true;
      } else {
        throw new Error("Nenhuma linha foi afetada. A senha não foi atualizada.");
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  }
  

  async loginUser(email, senha) {
    try {
      const query = {
        text: "SELECT id FROM usuarios WHERE email = $1 AND senha = $2",
        values: [email, senha],
      };
      const result = await pool.query(query);
      const usuario = result.rows[0];

      return usuario ? usuario.id : null;
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      throw error;
    }
  }
  async getNextSesionId() {
    try {
      const query = {
        text: "SELECT MAX(id) + 1 AS next_id FROM sessions",
      };
      const result = await pool.query(query);
      return result.rows[0].next_id || 1;
    } catch (error) {
      console.error("Erro ao obter próximo ID de pet:", error);
      throw error;
    }
  }

  async sessionId(userId) {
    try {
      var date = new Date();
      date = format(date, "yyyy-MM-dd HH:mm:ss");
      const id = await this.getNextSesionId();
      var sessionId = uuidv4();

      const query = {
        text: "INSERT INTO sessions (id, session_id, user_id, date) VALUES ($1, $2, $3, $4) RETURNING *",
        values: [id, sessionId, userId, date],
      };
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      throw error;
    }
  }
  async getUserBySession(sessionId) {
    try {
      const query = {
        text: "SELECT * FROM sessions WHERE session_id = $1 ORDER BY date DESC LIMIT 1",
        values: [sessionId],
      };
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao buscar sessão por ID:", error);
      throw error;
    }
  }
  async checkSessionExists(sessionId) {
    try {
      const query = {
        text: "SELECT * FROM sessions WHERE session_id = $1",
        values: [sessionId],
      };
      const result = await pool.query(query);
      return result.rows.length > 0;
    } catch (error) {
      console.error("Erro ao verificar sessão:", error);
      throw error;
    }
  }

  async deleteUser (userId) {
    try {
      const query = {
        text: "DELETE FROM usuarios WHERE id = $1",
        values: [userId],
      };
      const result = await pool.query(query);
      return result.rowCount;
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      throw error;
    }
  }

  async checkEmailExists(email) {
    try {
      const query = {
        text: "SELECT * FROM usuarios WHERE email = $1",
        values: [email],
      };
      const result = await pool.query(query);
      return result.rows.length > 0; 
    } catch (error) {
      console.error("Erro ao verificar sessão:", error);
      throw error;
    }
  }

  async deleteSessionByUserId(sessionid) {
    try {
      const query = {
        text: "DELETE FROM sessions WHERE session_id = $1",
        values: [sessionid],
      };
      const result = await pool.query(query);
      return result.rowCount; // Número de linhas excluídas
    } catch (error) {
      console.error("Erro ao excluir sessão por ID do usuário:", error);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const query = {
        text: "SELECT * FROM usuarios WHERE id = $1",
        values: [userId],
      };
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const query = {
        text: "SELECT * FROM usuarios WHERE email = $1",
        values: [email],
      };
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao buscar usuário por email:", error);
      throw error;
    }
  }
  
  async getNextPassCode() {
    try {
      const query = {
        text: "SELECT MAX(id) + 1 AS next_id FROM reset_password",
      };
      const result = await pool.query(query);
      return result.rows[0].next_id || 1;
    } catch (error) {
      console.error("Erro ao obter próximo ID de pet:", error);
      throw error;
    }
  }

  async checkCodeExists(code) {
    try {
      const query = { 
        text: "SELECT * FROM reset_password WHERE code = $1",
        values: [code],
      };
      const result = await pool.query(query);
      return result.rows.length > 0;
    } catch (error) {
      console.error("Erro ao verificar sessão:", error);
      throw error;
    }
  }
async createCode(code, email) {
  try {
    const id = await this.getNextPassCode();
    const timestamp = new Date(); 
    const query = {
      text: 'INSERT INTO reset_password (id, code, email, created_at) VALUES ($1, $2, $3, $4)',
      values: [id, code, email, timestamp],
    };
    const result = await pool.query(query);
    return result.rowCount; // Retorna o número de linhas afetadas (deve ser 1 se o registro for inserido com sucesso)
  } catch (error) {
    console.error('Erro ao adicionar código de redefinição de senha:', error);
    throw error;
  }
}

  async createUser(newUser) {
    try {
      const query = {
        text: "INSERT INTO usuarios (id, name, age, regiao, telefone, email, senha, image, ong) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        values: [
          newUser.id,
          newUser.name,
          newUser.age,
          newUser.regiao,
          newUser.telefone,
          newUser.email,
          newUser.senha,
          newUser.image,
          newUser.ong,
        ],
      };
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  }
}

module.exports = UserData;
