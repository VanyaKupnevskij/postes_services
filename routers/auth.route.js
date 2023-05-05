import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const authRouter = new Router();
const authController = new AuthController();

authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);
authRouter.get('/users', authController.getUsers);
authRouter.get('/users/:id', authController.getUserById);
authRouter.delete('/users/:id', authController.deleteUserById);

export default authRouter;
