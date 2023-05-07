import { Router } from 'express';
import RegistrationAction from '../ations/auth/RegistrationAction.js';
import LoginAction from '../ations/auth/LoginAction.js';
import GetUsersAction from '../ations/auth/GetUsersAction.js';
import GetUserByIdAction from '../ations/auth/GetUserByIdAction.js';
import DeleteUserByIdAction from '../ations/auth/DeleteUserByIdAction.js';

const authRouter = new Router();

const registrationAction = new RegistrationAction();
const loginAction = new LoginAction();
const getUsersAction = new GetUsersAction();
const getUserByIdAction = new GetUserByIdAction();
const deleteUserByIdAction = new DeleteUserByIdAction();

authRouter.post('/registration', registrationAction.run);
authRouter.post('/login', loginAction.run);
authRouter.get('/users', getUsersAction.run);
authRouter.get('/users/:id', getUserByIdAction.run);
authRouter.delete('/users/:id', deleteUserByIdAction.run);

export default authRouter;
