import mongoose, { Schema, model } from 'mongoose';
import { bookingType } from '../types/booking.type';

const bookingSchema = new Schema<bookingType>(
  {
    repairPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RepairPackage',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    orderStatus: {
      enum: ['pending', 'processing', 'resolved'],
      default: 'pending',
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const BookingModel = model<bookingType>('Booking', bookingSchema);

export default BookingModel;
