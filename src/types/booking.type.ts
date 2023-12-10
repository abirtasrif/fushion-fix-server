import { Document } from 'mongoose';
import { userType } from './user.type';
import { repairPackageType } from './repairPackage.type';

export type bookingType = {
  user: userType;
  repairPackage: repairPackageType;
  orderStatus: 'pending' | 'processing' | 'resolved';
} & Document;
