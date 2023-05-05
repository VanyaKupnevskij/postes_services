import { STATUS } from '../config/enums.js';

import BaseController from './BaseController.js';
import AuthService from '../services/AuthService.js';
import UserRepository from '../repositories/UserRepository.js';
import UID from '../lib/UID.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';

class AuthController extends BaseController {
  constructor() {
    super();

    this.authService = new AuthService(new UserRepository());
  }

  registration = async (req, res) => {
    const { email, password } = req.body;

    const createdUser = await this.authService.registration(email, password);

    return res.status(STATUS.created).json({ id: createdUser.id, email: createdUser.email });
  };

  login = async (req, res) => {
    const { email, password } = req.body;

    const token = await this.authService.login(email, password);

    return res.json({ success: true, token });
  };

  getUsers = async (req, res) => {
    const users = await this.authService.getUsers();

    return res.json(users);
  };

  getUserById = async (req, res) => {
    const id = req.params.id;
    this.#chekId(id);

    const user = await this.authService.getUserById(id);

    return res.json({ id: user.id, email: user.email });
  };

  deleteUserById = async (req, res) => {
    const id = req.params.id;
    this.#chekId(id);

    await this.authService.deleteUserById(id);

    return res.json({ success: true, message: `Seccesful deleted user by id: ${id}` });
  };

  #chekId(id) {
    if (!UID.isValid(id)) {
      throw new AppError(ERROR_PRESETS.INVALID_ID(id));
    }
  }
}

export default AuthController;
