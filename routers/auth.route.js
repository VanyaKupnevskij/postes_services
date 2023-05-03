import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import UserRepository from '../repositories/UserRepository.js';

const authRouter = new Router();
const authController = new AuthController(new UserRepository());

authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);
authRouter.get('/users', authController.getUsers);
authRouter.get('/users/:id', authController.getUserById);

export default authRouter;
