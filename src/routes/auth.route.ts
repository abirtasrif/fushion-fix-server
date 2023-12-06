import { Router } from 'express';
import express from 'express';

const authRouter: Router = express.Router();

//Register Route
authRouter.post('/register');

//Login Route
authRouter.post('/login');

export default authRouter;
