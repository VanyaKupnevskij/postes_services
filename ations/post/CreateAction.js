import IAction from '../IAction.js';
import { STATUS } from '../../config/enums.js';

import PostService from '../../services/PostService.js';
import PostRepository from '../../repositories/PostRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class CreateAction extends IAction {
  constructor() {
    super();

    this.postService = new PostService(new PostRepository());
  }

  get accessTag() {
    return 'post:create';
  }

  run = async (req, res) => {
    this.checkRole(req.user.role);

    const { title, text } = this.validate(req.body);

    const createdPost = await this.postService.create(title, text);

    return res.status(STATUS.created).json({ id: createdPost.id, title: createdPost.title });
  };

  validate(input) {
    const { title, text } = input;

    if (!title) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Title', title, 'must exist'));
    }
    if (!text) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Text', text, 'must exist'));
    }

    return { title, text };
  }
}

export default CreateAction;
