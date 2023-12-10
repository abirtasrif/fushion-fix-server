import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';

const bookingRouter: Router = express.Router();

const authInstance = new AuthMiddleware();

//create a booking
bookingRouter.post('/create/:rid', authInstance.isAuthenticated);

//get all bookings for an user
bookingRouter.get('/check/:uid', authInstance.isAuthenticated);

//delete a booking
bookingRouter.get('/:bid', authInstance.isAuthenticated);

//get all bookings
bookingRouter.get('/', authInstance.isAuthenticated, authInstance.isAdmin);

export default bookingRouter;
