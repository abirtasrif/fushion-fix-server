import { Document } from 'mongoose';
import { bookingType } from './booking.type';

export type repairPackageType = {
  title: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  bookings: bookingType[];
} & Document;
