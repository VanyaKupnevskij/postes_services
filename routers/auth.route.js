import { Router } from 'express';
import RegistrationAction from '../ations/auth/RegistrationAction.js';
import LoginAction from '../ations/auth/LoginAction.js';
import GetUsersAction from '../ations/auth/GetUsersAction.js';

const authRouter = new Router();

const registrationAction = new RegistrationAction();
const loginAction = new LoginAction();
const getUsersAction = new GetUsersAction();

authRouter.post('/registration', registrationAction.run);
authRouter.post('/login', loginAction.run);
authRouter.get('/users', getUsersAction.run);
// authRouter.get('/users/:id', authController.getUserById);
// authRouter.delete('/users/:id', authController.deleteUserById);

export default authRouter;
