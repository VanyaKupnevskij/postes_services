import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcryptjs';
import { STATUS, USER_CODE, STRENGTH_BCRYCT } from '../config/enums.js';
import UserEntity from '../entities/UserEntity.js';
import IController from './IController.js';

class AuthController extends IController {
  constructor(repository) {
    super(repository);
  }

  registration = async (req, res) => {
    try {
      const { email, password } = req.body;

      const findedUser = (await this.repository.findByEmail(email))[0];
      if (findedUser) {
        return res.status(STATUS.bad_request).send(`User with email: ${email} exist in BD`);
      }

      const hashedPassword = await bcrypt.hash(password, STRENGTH_BCRYCT);
      let user = new UserEntity();
      user.email = email;
      user.password = hashedPassword;

      const createdUser = await this.repository.add(user);

      return res.status(STATUS.created).json({ id: createdUser.id, email: createdUser.email });
    } catch (error) {
      console.log('registration:', error);
      return res
        .status(STATUS.ok)
        .json({ message: error.message, userCode: USER_CODE.error_server });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const findedUser = (await this.repository.findByEmail(email))[0];
      if (!findedUser) {
        return res
          .status(STATUS.non_authorization)
          .json({ success: false, message: 'Error authorization!' });
      }

      const isMatch = await bcrypt.compare(password, findedUser.password);
      if (!isMatch) {
        return res
          .status(STATUS.non_authorization)
          .json({ success: false, message: 'Error authorization!' });
      }

      const token = jwt.sign({ id: findedUser.id }, config.get('jwtSecret'));
      return res.json({ success: true, token });
    } catch (error) {
      console.log('login:', error);
      return res
        .status(STATUS.ok)
        .json({ message: error.message, userCode: USER_CODE.error_server });
    }
  };

  getUsers = async (req, res) => {
    try {
      const users = await this.repository.getAll();

      return res.json(users);
    } catch (error) {
      console.log(error);
      return res
        .status(STATUS.ok)
        .json({ message: error.message, userCode: USER_CODE.error_server });
    }
  };

  getUserById = async (req, res) => {
    try {
      const user = await this.repository.getById(req.params.id);

      return res.json({ id: user.id, email: user.email });
    } catch (error) {
      console.log(error);
      return res
        .status(STATUS.ok)
        .json({ message: error.message, userCode: USER_CODE.error_server });
    }
  };

  deleteUserById = async (req, res) => {
    try {
      const isSeccessful = await this.repository.remove(req.params.id);
      if (!isSeccessful) {
        return res.status(STATUS.bad_request).send(`Failed deleted user by id:${req.params.id}`);
      }

      return res.send(`Seccesful deleted user by id:${req.params.id}`);
    } catch (error) {
      console.log(error);
      return res
        .status(STATUS.ok)
        .json({ message: error.message, userCode: USER_CODE.error_server });
    }
  };
}

export default AuthController;
