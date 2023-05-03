import jwt from 'jsonwebtoken';
import config from 'config';
import UserEntity from '../entities/UserEntity.js';

class AuthController {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  registration = async (req, res) => {
    try {
      const { email, password } = req.body;

      let user = new UserEntity();
      user.email = email;
      user.password = password;

      const createdUser = await this.#repository.add(user);

      res.status(201).json(createdUser);
    } catch (error) {
      console.log('registration:', error);
      res.status(500).send(error.message);
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      let user = new UserEntity();
      user.email = email;
      user.password = password;

      const findedUser = (await this.#repository.find(user))[0];

      if (findedUser) {
        const token = jwt.sign({ id: findedUser.id }, config.get('jwtSecret'));
        res.json({ success: true, token });
      } else {
        res.status(401).json({ success: false, message: 'Error authorization!' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  };

  getUsers = async (req, res) => {
    try {
      const users = await this.#repository.getAll();

      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  };

  getUserById = async (req, res) => {
    try {
      const user = await this.#repository.getById(req.params.id);

      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  };
}

export default AuthController;
