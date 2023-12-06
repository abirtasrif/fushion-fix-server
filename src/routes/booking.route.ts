import express, { Router } from 'express';

const bookingRouter: Router = express.Router();

//create a booking
bookingRouter.post('/create');

//get all bookings
bookingRouter.get('/');

//get all bookings for an user
bookingRouter.get('/check');

//delete a booking
bookingRouter.get('/:bid');

export default bookingRouter;
