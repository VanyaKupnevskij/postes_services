import { Router } from 'express';
import PostController from '../controllers/PostController.js';
import PostRepository from '../repositories/PostRepository.js';
import auth from '../middlewares/auth.middleware.js';

const postRouter = new Router();
const postController = new PostController(new PostRepository());

postRouter.post('/create', auth, postController.create);
postRouter.get('/', auth, postController.getAll);
postRouter.get('/:id', auth, postController.getById);
postRouter.delete('/:id', auth, postController.deleteById);

export default postRouter;
