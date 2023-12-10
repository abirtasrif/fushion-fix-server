import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import BookingController from '../controllers/booking.controller';

const bookingRouter: Router = express.Router();

const authInstance = new AuthMiddleware();
const bookingInstance = new BookingController();

//create a booking
bookingRouter.post(
  '/create/:rid',
  authInstance.isAuthenticated,
  bookingInstance.createABooking
);

//delete a booking
bookingRouter.get(
  '/:bid',
  authInstance.isAuthenticated,
  bookingInstance.deleteABooking
);

//get all bookings
bookingRouter.get(
  '/',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  bookingInstance.getAllBooking
);

export default bookingRouter;
