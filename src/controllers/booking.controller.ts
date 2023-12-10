import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleError } from '../errors/handle.error';
import BookingModel from '../models/booking.model';

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

      await Promise.resolve().then(async () => {
        const booking = await BookingModel.create({
          repairPackage: rid,
          user: req.user?._id,
        });

        res.status(200).json(booking);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
