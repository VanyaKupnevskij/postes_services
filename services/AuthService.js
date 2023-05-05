import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcryptjs';

import { STATUS, USER_CODE, STRENGTH_BCRYCT, LAYER } from '../config/enums.js';
import AppError from '../errors/AppError.js';
import BaseService from './BaseService.js';
import UserEntity from '../entities/UserEntity.js';

class AuthService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  registration = async (email, password) => {
    const findedUser = (await this.repository.findByEmail(email))[0];
    if (findedUser) {
      throw new AppError({
        message: `User with email: ${email} exist in BD`,
        status: STATUS.bad_request,
        userCode: USER_CODE.ok,
        layer: LAYER.service,
      });
    }

    const hashedPassword = await bcrypt.hash(password, STRENGTH_BCRYCT);
    let user = new UserEntity();
    user.email = email;
    user.password = hashedPassword;

    const createdUser = await this.repository.add(user);

    return createdUser;
  };
}

export default AuthService;
