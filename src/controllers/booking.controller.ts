import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleError } from '../errors/handle.error';
import BookingModel from '../models/booking.model';
import RepairPackageModel from '../models/reapairPackage.model';
import UserModel from '../models/user.model';
import { bookingType } from '../types/booking.type';

export default class BookingController {
  constructor() {}

  public async createABooking(req: Request, res: Response): Promise<void> {
    try {
      const { rid } = req.params;

      if (req.query?.repair_package) {
        if (!mongoose.Types.ObjectId.isValid(rid)) {
          res.status(404).json({ message: 'Repair Package not found' });
        }
      }

      const user = await UserModel.findById(req.user?._id).populate('bookings');

      const alreadyBooked = user?.bookings.find(
        (booking: bookingType) => rid === booking.repairPackage._id.toString()
      );

      if (alreadyBooked) {
        res.status(403).json({ message: 'Package already booked' });
        return;
      }

      await Promise.resolve().then(async () => {
        const booking = await BookingModel.create({
          repairPackage: rid,
          user: req.user?._id,
        });

        await RepairPackageModel.findByIdAndUpdate(rid, {
          $addToSet: {
            bookings: booking._id,
          },
        });

        await UserModel.findByIdAndUpdate(req.user?._id, {
          $addToSet: {
            bookings: booking._id,
          },
        });

        res.status(200).json(booking);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async deleteABooking(req: Request, res: Response): Promise<void> {
    try {
      const { bid } = req.params;

      if (req.query?.repair_package) {
        if (!mongoose.Types.ObjectId.isValid(bid)) {
          res.status(404).json({ message: 'Booking not found' });
        }
      }

      const user = await UserModel.findById(req.user?._id);

      const matchedBooking = user?.bookings.find(
        (booking: bookingType) => bid === booking._id
      );

      if (!matchedBooking) {
        res.status(403).json({
          message: "Booking doesn't exist",
        });
      }

      await Promise.resolve().then(async () => {
        const booking = await BookingModel.findByIdAndDelete(bid);

        res.status(200).json(booking);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getAllBooking(req: Request, res: Response): Promise<void> {
    try {
      const bookings = await BookingModel.find({});

      res.status(200).json(bookings);
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
