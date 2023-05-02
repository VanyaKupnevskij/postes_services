import { Router } from 'express';
import authController from '../controllers/authController.js';

const authRouter = new Router();

authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);
authRouter.get('/users', authController.getUsers);

export default authRouter;
