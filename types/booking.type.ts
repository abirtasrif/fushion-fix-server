import { Document } from 'mongoose';
import { userType } from './user.type';
import { repairPackageType } from './repairPackage';

export type bookingType = {
  user: userType;
  repairPackage: repairPackageType;
} & Document;
