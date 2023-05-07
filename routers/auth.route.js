import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import RegistrationAction from '../ations/auth/registrationAction.js';

const authRouter = new Router();
const authController = new AuthController();

const registrationAction = new RegistrationAction();

authRouter.post('/registration', registrationAction.run);
authRouter.post('/login', authController.login);
authRouter.get('/users', authController.getUsers);
authRouter.get('/users/:id', authController.getUserById);
authRouter.delete('/users/:id', authController.deleteUserById);

export default authRouter;
