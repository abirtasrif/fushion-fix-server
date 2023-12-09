import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';

const userRouter: Router = express.Router();

const authInstance = new AuthMiddleware();
const userInstance = new UserController();

//get a single user
userRouter.get('/:uid', authInstance.isAuthenticated, userInstance.getAnUser);

//delete a single user
userRouter.delete(
  '/:uid',
  authInstance.isAuthenticated,
  userInstance.deleteAnUser
);

//update a single user
userRouter.put(
  '/:uid',
  authInstance.isAuthenticated,
  userInstance.UpdateAnUser
);

//get all users
userRouter.get(
  '/',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  userInstance.getAllUsers
);

export default userRouter;
