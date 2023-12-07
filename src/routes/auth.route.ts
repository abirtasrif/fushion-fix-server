import { Router } from 'express';
import express from 'express';
import AuthController from '../controllers/auth.controller';

const authRouter: Router = express.Router();

const authInstance = new AuthController();

//Register Route
authRouter.post('/register', authInstance.register);

//Login Route
authRouter.post('/login', authInstance.login);

export default authRouter;
