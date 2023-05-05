import { LAYER, STATUS, USER_CODE } from '../config/enums.js';

class AppError extends Error {
  constructor(options) {
    if (!options || !options.message) throw new Error('message param required');

    super(options.message);
    this.status = options.status || STATUS.fall_server;
    this.userCode = options.userCode || USER_CODE.error_server;
    this.layer = options.layer || LAYER.global;
  }
}

export default AppError;
