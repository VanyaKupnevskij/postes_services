import { Router } from 'express';
import PostController from '../controllers/PostController.js';
import PostRepository from '../repositories/PostRepository.js';

const postRouter = new Router();
const postController = new PostController(new PostRepository());

postRouter.post('/create', postController.create);
postRouter.get('/', postController.getAll);
postRouter.get('/:id', postController.getById);
postRouter.delete('/:id', postController.deleteById);

export default postRouter;
