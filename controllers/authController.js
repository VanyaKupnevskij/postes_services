import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcryptjs';
import UserEntity from '../entities/UserEntity.js';

class AuthController {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  registration = async (req, res) => {
    try {
      const { email, password } = req.body;

      const findedUser = (await this.#repository.findByEmail(email))[0];
      if (findedUser) {
        return res.status(400).send(`User with email: ${email} exist in BD`);
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      let user = new UserEntity();
      user.email = email;
      user.password = hashedPassword;

      const createdUser = await this.#repository.add(user);

      return res.status(201).json({ id: createdUser.id, email: createdUser.email });
    } catch (error) {
      console.log('registration:', error);
      return res.status(500).send(error.message);
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const findedUser = (await this.#repository.findByEmail(email))[0];
      if (!findedUser) {
        return res.status(401).json({ success: false, message: 'Error authorization!' });
      }

      const isMatch = await bcrypt.compare(password, findedUser.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Error authorization!' });
      }

      const token = jwt.sign({ id: findedUser.id }, config.get('jwtSecret'));
      return res.json({ success: true, token });
    } catch (error) {
      console.log('login:', error);
      return res.status(500).send(error.message);
    }
  };

  getUsers = async (req, res) => {
    try {
      const users = await this.#repository.getAll();

      return res.json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  };

  getUserById = async (req, res) => {
    try {
      const user = await this.#repository.getById(req.params.id);

      return res.json({ id: user.id, email: user.email });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  };

  deleteUserById = async (req, res) => {
    try {
      const isSeccessful = await this.#repository.remove(req.params.id);
      if (!isSeccessful) {
        return res.status(400).send(`Failed deleted user by id:${req.params.id}`);
      }

      return res.send(`Seccesful deleted user by id:${req.params.id}`);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  };
}

export default AuthController;
