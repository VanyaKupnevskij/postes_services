import IAction from '../IAction.js';

import AuthService from '../../services/AuthService.js';
import UserRepository from '../../repositories/UserRepository.js';
import { LAYER, PERMISSIONS } from '../../config/enums.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class GetUsersAction extends IAction {
  constructor() {
    super();

    this.authService = new AuthService(new UserRepository());
  }

  get accessTag() {
    return 'auth:getusers';
  }

  run = async (req, res) => {
    if (!PERMISSIONS[req.user.role].includes(this.accessTag)) {
      throw new AppError({ ...ERROR_PRESETS.AUTHORIZATION, layer: LAYER.action });
    }

    const users = await this.authService.getUsers();

    return res.json(users);
  };

  validate(input) {}
}

export default GetUsersAction;
