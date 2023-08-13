const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "AdoteSuaPatinha",
    password: "Zequinha2005",
    port: 5432, // Porta padrão do PostgreSQL
  });

class PostData {
  constructor() {
    // Não precisa do caminho do arquivo JSON, pois estamos usando o PostgreSQL
  }

  async createPost(post) {
    try {
      const query = {
        text: 'INSERT INTO posts (titulo, descricao, categoria, userId) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [post.titulo, post.descricao, post.categoria, post.userId],
      };
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar post:', error);
      throw error;
    }
  }

  async getPostById(postId) {
    try {
      const query = {
        text: 'SELECT * FROM posts WHERE id = $1',
        values: [postId],
      };
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao buscar post por ID:', error);
      throw error;
    }
  }
}

module.exports = PostData;
