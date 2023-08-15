const { Pool } = require('pg');
const user = process.env.POSTGRES_USER || "postgres";
const host = process.env.POSTGRES_HOST || "localhost";
const database = process.env.POSTGRES_DATABASE || "AdoteSuaPatinha";
const password = process.env.POSTGRES_PASSWORD || "Zequinha2005";
const port = process.env.POSTGRES_PORT || 5432;
const pool = new Pool({
  //  ssl: true,
    user: user,
    host: host,
    database: database,
    password: password,
    port: port, // Porta padrão do PostgreSQL
  });

class PostData {
  constructor() {
    // Não precisa do caminho do arquivo JSON, pois estamos usando o PostgreSQL
  }

  async getAllPosts(searchTerm = "") {
    try {
      const query = {
        text: `SELECT * FROM posts ${
          searchTerm ? 'WHERE titulo ILIKE $1 OR descricao ILIKE $1' : ''
        }`,
        values: searchTerm ? [`%${searchTerm}%`] : [],
      };
      const result = await pool.query(query);
      let posts = result.rows;

      return posts;
    } catch (error) {
      console.error('Erro ao obter posts:', error);
      throw error;
    }
  }

  async createPost(post) {
    try {
        const id = await this.getNextPostId();
      const query = {
        text: 'INSERT INTO posts (id, titulo, descricao, categoria, userId) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values: [id, post.titulo, post.descricao, post.categoria, post.userId],
      };
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar post:', error);
      throw error;
    }
  }

  async getNextPostId() {
    try {
      const query = {
        text: 'SELECT MAX(id) + 1 AS next_id FROM posts',
      };
      const result = await pool.query(query);
      return result.rows[0].next_id || 1;
    } catch (error) {
      console.error('Erro ao obter próximo ID de resposta:', error);
      throw error;
    }
  }

  async getNextReplyId() {
    try {
      const query = {
        text: 'SELECT MAX(id) + 1 AS next_id FROM respostas',
      };
      const result = await pool.query(query);
      return result.rows[0].next_id || 1;
    } catch (error) {
      console.error('Erro ao obter próximo ID de resposta:', error);
      throw error;
    }
  }

async deletePost(postId) {
    try {
      const query = {
        text: 'DELETE FROM posts WHERE id = $1',
        values: [postId],
      };
      await pool.query(query);
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      throw error;
    }
  }

  async getPostReplies(postId) {
    try {
      const query = {
        text: 'SELECT * FROM respostas WHERE postid = $1',
        values: [postId],
      };
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar respostas:', error);
      throw error;
    }
  }

  async createPostReply(postId, reply) {
    try {
        const id = await this.getNextReplyId();
      const query = {
        text: 'INSERT INTO respostas (id,  descricao,  userId, postid) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [id, reply.descricao, reply.userId , postId],
      };
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar resposta:', error);
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
