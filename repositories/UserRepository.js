import IRepository from './IRepository.js';

import { pool as connection } from '../config/database.mysql.js';
import UID from '../lib/UID.js';

class UserRepository extends IRepository {
  constructor() {
    super();
  }

  async add(newUser) {
    await connection.query('INSERT INTO users (id, email, password) VALUES (?, ?, ?)', [
      newUser.id,
      newUser.email,
      newUser.password,
    ]);

    return this.getById(newUser.id);
  }

  async update(id, newUser) {}

  async getById(id) {
    if (!UID.isValid(id)) {
      throw new Error(`Id: ${id} is not valid`);
    }

    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);

    const user = rows[0];
    if (!user) throw new Error(`The user with ${id} id does not exist.`);

    return user;
  }

  async getAll() {
    const [rows] = await connection.execute('SELECT id, email FROM users');

    return rows;
  }

  async remove(id) {}

  async findByEmail(email) {
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    return rows;
  }
}

export default UserRepository;
