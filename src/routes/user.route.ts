import express, { Router } from 'express';

const userRouter: Router = express.Router();

//get all users
userRouter.get('/');

//get a single user
userRouter.get('/:uid');

//delete a single user
userRouter.delete('/:uid');

//update a single user
userRouter.put('/:uid');

export default userRouter;
