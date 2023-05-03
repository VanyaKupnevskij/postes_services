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

      const isLogin = email === 'admin@gmail.com' && password === '12345';

      if (isLogin) {
        const token = jwt.sign({ email, fullname: 'nameUser' }, config.get('jwtSecret'));
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
      res.send('users'); // temporary code
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
