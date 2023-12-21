import mongoose, { Schema, model } from 'mongoose';
import { repairPackageType } from '../types/repairPackage.type';

const repairPackageSchema = new Schema<repairPackageType>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: [{ type: String, required: true }],

    price: {
      type: Number,
      required: true,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const RepairPackageModel = model<repairPackageType>(
  'RepairPackage',
  repairPackageSchema
);

export default RepairPackageModel;
