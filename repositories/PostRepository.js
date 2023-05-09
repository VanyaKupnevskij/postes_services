import IRepository from './IRepository.js';

import { pool as connection } from '../config/database.mysql.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';

class PostRepository extends IRepository {
  constructor() {
    super();
  }

  async add(newPost) {
    await connection.query('INSERT INTO users (id, title, text) VALUES (?, ?, ?)', [
      newPost.id,
      newPost.title,
      newPost.text,
    ]);

    return this.getById(newPost.id);
  }

  async update(id, newPost) {}

  async getById(id) {
    const [rows] = await connection.execute('SELECT * FROM postes WHERE id = ?', [id]);

    const post = rows[0];
    if (!post) throw new AppError(ERROR_PRESETS.USER_ID_NOT_EXIST(id));

    return post;
  }

  async getAll() {
    const [rows] = await connection.execute('SELECT id, title FROM postes');

    return rows;
  }

  async remove(id) {
    const result = await connection.query('DELETE FROM postes WHERE id = ?', [id]);

    return result[0].affectedRows > 0;
  }

  async findByTitle(title) {
    const [rows] = await connection.execute('SELECT * FROM postes WHERE title = ?', [title]);

    return rows;
  }
}

export default PostRepository;
